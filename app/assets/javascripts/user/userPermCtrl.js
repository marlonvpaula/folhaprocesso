
angular.module('StarterApp.controllers')
.controller('UserPermCtrl', [
						'$scope',
						'$stateParams',
						'$mdSidenav',
						'users',
						'user',
function($scope, $stateParams, $mdSidenav, users, user){
	$scope.user = user;


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}]);