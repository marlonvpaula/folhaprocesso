angular.module('StarterApp.controllers')

.controller('ComandoCtrl', ['$scope',
														 '$state',
														 '$mdMedia',
														 '$mdDialog',
														 '$mdSidenav',
                             '$mdToast',
		                         'comandos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, $mdToast, comandos){
	$scope.comandos = comandos.comandos;


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
          .title('Você tem certeza que deseja remover o(s) ' + $scope.selected.length + ' comando(s) selecionado(s)?')
          .textContent('O(s) comando(s) será(am) removido(s) permanentemente do sistema.')
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
      controller: 'DialogComanController',
      templateUrl: 'comando/_newComando.html',
      parent: angular.element(document.body),
      locals: {
        comando: $scope.comando
      },
      targetEvent: ev,
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
    $scope.comando = null;
    showAdvanced(ev);
  }

  function remover() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		comandos.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
    $mdToast.show(
      $mdToast.simple()
        .textContent('Comando(s) removido(s) com sucesso.')
        .position("top right")
        .hideDelay(3000)
    );
  }

  $scope.editar = function (id, ev) {
    comandos.get(id).then(function(comando){
      $scope.comando = comando;
      showAdvanced(ev);
    });
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
.controller('DialogComanController', ['$scope',
                                      '$mdDialog',
                                      '$mdToast',
                                      'comandos',
                                      'comando',
function ($scope, $mdDialog, $mdToast, comandos, comando) {
    var update = false;
    if (comando != null) {
      update = true;
      $scope.comando = comando;
    }
    else {
      update = false;
      $scope.comando = {};
    }

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.salvar = function() {
      if(!$scope.comando.descricao || $scope.comando.descricao === '') { return; }
      if (update) {
        comandos.update($scope.comando.id, {
          id: $scope.comando.id,
          descricao: $scope.comando.descricao,
        });
        $mdToast.show(
          $mdToast.simple()
            .textContent('Comando (' + $scope.comando.descricao + ') alterado com sucesso.')
            .position("top right")
            .hideDelay(3000)
        );
      }
      else {
        comandos.create({
          descricao: $scope.comando.descricao,
        });
        $mdToast.show(
          $mdToast.simple()
            .textContent('Comando (' + $scope.comando.descricao + ') salvo com sucesso.')
            .position("top right")
            .hideDelay(3000)
        );
      }
      $scope.comando.descricao = '';
      $mdDialog.hide();
    };
}]);
