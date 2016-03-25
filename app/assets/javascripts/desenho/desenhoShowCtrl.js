angular.module('StarterApp.controllers')

.controller('DesenhoShowCtrl',['$scope',
															 '$state',
															 '$stateParams',
															 '$mdSidenav',
			                         'desenhos',  
			                         'desenho',
function($scope, $state, $stateParams, $mdSidenav, desenhos, desenho){
	$scope.desenho = desenho;


	$scope.voltar = function() {
    $state.go('desenhos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);