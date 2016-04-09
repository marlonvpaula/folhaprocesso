angular.module('StarterApp.controllers')

.controller('OperacaoCtrl', ['$scope',
														 '$state',
														 '$mdMedia',
														 '$mdDialog',
														 '$mdSidenav',
		                         'operacaos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, operacaos){
	$scope.operacaos = operacaos.operacaos;


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
  
  function showAdvanced(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'DialogOperaController',
      templateUrl: 'operacao/_newOperacao.html',
      parent: angular.element(document.body),
      locals: {
        operacao: $scope.operacao
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
    $scope.operacao = null;
    showAdvanced(ev);
  }

  $scope.remover = function() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		operacaos.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
  }

  $scope.editar = function (id, ev) {
    operacaos.get(id).then(function(operacao){
      $scope.operacao = operacao;
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
.controller('DialogOperaController', ['$scope',
                                      '$mdDialog',
                                      'operacaos',
                                      'operacao',
function ($scope, $mdDialog, operacaos, operacao) {
    var update = false;
    if (operacao != null) {
      update = true;
      $scope.operacao = operacao;
    }
    else {
      update = false;
      $scope.operacao = {};
    }

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.salvar = function() {
      if(!$scope.operacao.descricao || $scope.operacao.descricao === '') { return; }
      if (update) {
        operacaos.update($scope.operacao.id, {
          id: $scope.operacao.id,
          descricao: $scope.operacao.descricao,
        });
      }
      else {
        operacaos.create({
          descricao: $scope.operacao.descricao,
        });
      }
      $scope.operacao.descricao = '';
      $mdDialog.hide();
    };
}]);
