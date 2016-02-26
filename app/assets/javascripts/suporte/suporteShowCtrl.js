angular.module('StarterApp.controllers')

.controller('SuporteShowCtrl',['$scope',
															 '$state',
															 '$stateParams',
															 '$mdSidenav',
			                         'suportes',  
			                         'suporte',
function($scope, $state, $stateParams, $mdSidenav, suportes, suporte){
	$scope.suporte = suporte;
	console.log($scope.suporte);

	$scope.voltar = function() {
    $state.go('suportes');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);