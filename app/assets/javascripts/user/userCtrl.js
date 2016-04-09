
angular.module('StarterApp.controllers')

.controller('UserCtrl', ['$scope',
												 '$state',
												 '$mdSidenav',
                         'users',  
function($scope, $state, $mdSidenav, users){
	$scope.users = users.users;


  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];
  
  $scope.filter = {
    show: false,
    search: ''
  };

  $scope.query = {
    order: 'id',
    limit: 5,
    page: 1
  };
  
  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.filter.search = '';
  }

	$scope.chamaPerm = function (id) {
		$state.go('user', { "id": id});
	}

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}]);