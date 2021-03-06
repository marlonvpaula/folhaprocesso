angular.module('StarterApp.controllers')

.controller('AcessorioCtrl', ['$scope',
														  '$state',
														  '$mdMedia',
														  '$mdDialog',
														  '$mdSidenav',
                              '$mdToast',
		                          'acessorios',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, $mdToast, acessorios){
	$scope.acessorios = acessorios.acessorios;


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
          .title('Você tem certeza que deseja remover o(s) ' + $scope.selected.length + ' acessório(s) selecionado(s)?')
          .textContent('O(s) acessório(s) será(am) removido(s) permanentemente do sistema.')
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
      controller: 'DialogAcessController',
      templateUrl: 'cessorio/_newAcessorio.html',
      parent: angular.element(document.body),
      locals: {
        acessorio: $scope.acessorio
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
    $scope.acessorio = null;
    showAdvanced(ev);
  }

  function remover () {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		acessorios.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
    $mdToast.show(
      $mdToast.simple()
        .textContent('Acessório(s) removido(s) com sucesso.')
        .position("top right")
        .hideDelay(3000)
    );
  }

  $scope.editar = function (id, ev) {
    acessorios.get(id).then(function(acessorio){
      $scope.acessorio = acessorio;
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
.controller('DialogAcessController', ['$scope',
                                      '$mdDialog',
                                      '$mdToast',
                                      'acessorios',
                                      'acessorio',
function ($scope, $mdDialog, $mdToast, acessorios, acessorio) {
    var update = false;
    if (acessorio != null) {
      update = true;
      $scope.acessorio = acessorio;
    }
    else {
      update = false;
      $scope.acessorio = {};
    }

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.salvar = function() {
      if(!$scope.acessorio.descricao || $scope.acessorio.descricao === '') { return; }
      if (update) {
        acessorios.update($scope.acessorio.id, {
          id: $scope.acessorio.id,
          descricao: $scope.acessorio.descricao,
        });
        $mdToast.show(
          $mdToast.simple()
            .textContent('Acessório (' + $scope.acessorio.descricao + ') alterado com sucesso.')
            .position("top right")
            .hideDelay(3000)
        );
      }
      else {
        acessorios.create({
          descricao: $scope.acessorio.descricao,
        });
        $mdToast.show(
          $mdToast.simple()
            .textContent('Acessório (' + $scope.acessorio.descricao + ') salvo com sucesso.')
            .position("top right")
            .hideDelay(3000)
        );
      }
      $scope.acessorio.descricao = '';
      $mdDialog.hide();
    };
}]);
