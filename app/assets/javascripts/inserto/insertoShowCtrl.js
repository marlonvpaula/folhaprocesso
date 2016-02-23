angular.module('StarterApp.controllers')

.controller('InsertoShowCtrl',['$scope',
															 '$state',
															 '$stateParams',
															 '$mdSidenav',
			                         'insertos',  
			                         'inserto',
function($scope, $state, $stateParams, $mdSidenav, insertos, inserto){
	$scope.inserto = inserto;
	console.log($scope.inserto);

	$scope.voltar = function() {
    $state.go('insertos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);