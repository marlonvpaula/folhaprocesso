angular.module('StarterApp.controllers')

.controller('OperacaoCtrl', ['$scope',
														 '$state',
														 '$mdMedia',
														 '$mdDialog',
														 '$mdSidenav',
		                         'operacaos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, operacaos){
	$scope.operacaos = operacaos.operacaos;


	$scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'DialogOperaController',
      templateUrl: 'operacao/_newOperacao.html',
      parent: angular.element(document.body),
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

  $scope.remover = function() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		operacaos.remove(
		    $scope.selected[i].id
		  );
		  $scope.selected = {};
  	}
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}])
.controller('DialogOperaController', ['$scope',
                                      '$mdDialog',
                                      'operacaos',
function ($scope, $mdDialog, operacaos) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.salvar = function() {
      if(!$scope.operacao.descricao || $scope.operacao.descricao === '') { return; }
      operacaos.create({
        descricao: $scope.operacao.descricao,
      });
      $scope.operacao.descricao = '';
      $mdDialog.hide();
    };
}]);
