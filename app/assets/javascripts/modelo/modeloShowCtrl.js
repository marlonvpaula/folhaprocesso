angular.module('StarterApp.controllers')

.controller('ModeloShowCtrl',['$scope',
															 '$state',
															 '$stateParams',
															 '$mdSidenav',
			                         'modelos',  
			                         'modelo',
function($scope, $state, $stateParams, $mdSidenav, modelos, modelo){
	$scope.modelo = modelo;

	$scope.voltar = function() {
    $state.go('modelos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);