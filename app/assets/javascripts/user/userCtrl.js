
angular.module('StarterApp.controllers')

.controller('UserCtrl', ['$scope',
												 '$state',
												 '$mdSidenav',
                         'users',  
function($scope, $state, $mdSidenav, users){
	$scope.users = users.users;

	$scope.chamaPerm = function (id) {
		$state.go('user', { "id": id});
	}

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}]);