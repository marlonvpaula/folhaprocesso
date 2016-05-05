
  angular.module('StarterApp.controllers')

.controller('HomePageCtrl', ['$scope',  '$mdToast', '$mdSidenav', function($scope, $mdToast, $mdSidenav){

  $rootScope.ngShow = false;

  
  $scope.openToast = function($event) {
    $mdToast.show($mdToast.simple().content('Hello!'));
    //$mdToast.showSimple('Hello');
    // Could also do $mdToast.showSimple('Hello');
  };

  
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);
