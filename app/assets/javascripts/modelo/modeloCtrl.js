angular.module('StarterApp.controllers')

.controller('ModeloCtrl', ['$scope',
														'$state',
														'$mdMedia',
														'$mdDialog',
														'$mdSidenav',
		                        'modelos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, modelos){
	$scope.modelos = modelos.modelos;


	$scope.newModelo = function() {
    $state.go('modelo');
  };

  $scope.showModelo = function(id) {
    $state.go('showModelo', { "id": id});
  };

  $scope.editarModelo = function(id) {
    $state.go('updateModelo', { "id": id});
  };

  $scope.remover = function() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		modelos.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}]);
