angular.module('StarterApp.controllers')

.controller('GrupomodeloCtrl', ['$scope',
														 '$state',
														 '$mdMedia',
														 '$mdDialog',
														 '$mdSidenav',
		                         'grupomodelos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, grupomodelos){
	$scope.grupomodelos = grupomodelos.grupomodelos;


	$scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'DialogGrupoController',
      templateUrl: 'grupomodelo/_newGrupomodelo.html',
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
  		grupomodelos.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}])
.controller('DialogGrupoController', ['$scope',
                                      '$mdDialog',
                                      'grupomodelos',
function ($scope, $mdDialog, grupomodelos) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.salvar = function() {
      if(!$scope.grupomodelo.descricao || $scope.grupomodelo.descricao === '') { return; }
      grupomodelos.create({
        descricao: $scope.grupomodelo.descricao,
      });
      $scope.grupomodelo.descricao = '';
      $mdDialog.hide();
    };
}]);
