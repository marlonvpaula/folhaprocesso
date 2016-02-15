
  angular.module('StarterApp.controllers')

.controller('HomeCtrl', ['$scope',  '$mdToast', '$mdSidenav', function($scope, $mdToast, $mdSidenav){
  $scope.pessoas = [
         {id: 1, nome:'Marlon', tel:"123456", email:"marlonvpaula@gmail.com"},
         {id: 2, nome:'Marlon', tel:"123456", email:"marlonvpaula@gmail.com"}
    ];


  
  $scope.openToast = function($event) {
    $mdToast.show($mdToast.simple().content('Hello!'));
    //$mdToast.showSimple('Hello');
    // Could also do $mdToast.showSimple('Hello');
  };

  
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);
