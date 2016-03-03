angular.module('StarterApp.controllers')

.controller('RaioCtrl', ['$scope',
														 '$state',
														 '$mdMedia',
														 '$mdDialog',
														 '$mdSidenav',
		                         'raios',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, raios){
	$scope.raios = raios.raios;


	$scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'DialogRaioController',
      templateUrl: 'raio/_newRaio.html',
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
  		raios.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}])
.controller('DialogRaioController', ['$scope',
                                      '$mdDialog',
                                      'raios',
function ($scope, $mdDialog, raios) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.salvar = function() {
      if(!$scope.raio.valor || $scope.raio.valor === '') { return; }
      raios.create({
        valor: $scope.raio.valor,
      });
      $scope.raio.valor = '';
      $mdDialog.hide();
    };
}]);
