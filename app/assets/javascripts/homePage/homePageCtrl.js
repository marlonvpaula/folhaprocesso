angular.module('StarterApp.controllers')

.controller('HomePageCtrl', ['$scope', '$state',  '$mdToast', '$mdSidenav', function($scope, $state, $mdToast, $mdSidenav){

  //$rootScope.ngShow = false;

  
  $scope.login = function () {
    $state.go('login');
  }
  
  $scope.openToast = function($event) {
    $mdToast.show($mdToast.simple().content('Hello!'));
    //$mdToast.showSimple('Hello');
    // Could also do $mdToast.showSimple('Hello');
  };

  
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);
