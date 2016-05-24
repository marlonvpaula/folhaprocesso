angular.module('StarterApp.controllers')

.controller('GrupomodeloCtrl', ['$scope',
														    '$state',
														    '$mdMedia',
														    '$mdDialog',
														    '$mdSidenav',
                                '$mdToast',
		                            'grupomodelos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, $mdToast, grupomodelos){
	$scope.grupomodelos = grupomodelos.grupomodelos;

  
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];
  
  $scope.filter = {
    show: false,
    search: ''
  };

  $scope.query = {
    order: 'id',
    limit: 5,
    page: 1
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.filter.search = '';
  }

  $scope.delete = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Você tem certeza que deseja remover o(s) ' + $scope.selected.length + ' Grupo Maquina(s) selecionado(s)?')
          .textContent('O(s) Grupo Maquina(s) será(am) removido(s) permanentemente do sistema.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Remover')
          .cancel('Cancelar');
    $mdDialog.show(confirm).then(function() {
      remover();
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  }
  
	function showAdvanced(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'DialogGrupoController',
      templateUrl: 'grupomodelo/_newGrupomodelo.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: {
        grupomodelo: $scope.grupomodelo
      },
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  $scope.novo = function (ev) {
    $scope.grupomodelo = null;
    showAdvanced(ev);
  }


  $scope.editar = function (id, ev) {
    grupomodelos.get(id).then(function(grupomodelo){
      $scope.grupomodelo = grupomodelo;
      showAdvanced(ev);
    });
  }

  function remover () {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		grupomodelos.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
    $mdToast.show(
      $mdToast.simple()
        .textContent('Grupo de Máquina(s) removido(s) com sucesso.')
        .position("top right")
        .hideDelay(3000)
    );
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  
  $scope.demo = {
    showTooltip : false,
    tipDirection : ''
  };
  $scope.demo.delayTooltip = undefined;
  $scope.$watch('demo.delayTooltip',function(val) {
    $scope.demo.delayTooltip = parseInt(val, 10) || 0;
  });
  $scope.$watch('demo.tipDirection',function(val) {
    if (val && val.length ) {
      $scope.demo.showTooltip = true;
    }
  });
  
}])
.controller('DialogGrupoController', ['$scope',
                                      '$mdDialog',
                                      '$mdToast',
                                      'grupomodelos',
                                      'grupomodelo',
function ($scope, $mdDialog, $mdToast, grupomodelos, grupomodelo) {
    var update = false;
    if (grupomodelo != null) {
      update = true;
      $scope.grupomodelo = grupomodelo;
    }
    else {
      update = false;
      $scope.grupomodelo = {};
    }

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.salvar = function() {
      if(!$scope.grupomodelo.descricao || $scope.grupomodelo.descricao === '') { return; }
      if (update) {
        grupomodelos.update($scope.grupomodelo.id, {
          id: $scope.grupomodelo.id,
          descricao: $scope.grupomodelo.descricao,
        });
        $mdToast.show(
          $mdToast.simple()
            .textContent('Grupo de Máquina (' + $scope.grupomodelo.descricao + ') alterado com sucesso.')
            .position("top right")
            .hideDelay(3000)
        );
      }
      else {
        grupomodelos.create({
          descricao: $scope.grupomodelo.descricao,
        });
        $mdToast.show(
          $mdToast.simple()
            .textContent('Grupo de Máquina (' + $scope.grupomodelo.descricao + ') salvo com sucesso.')
            .position("top right")
            .hideDelay(3000)
        );
      }
      $scope.grupomodelo.descricao = '';
      $mdDialog.hide();
    };
}]);
