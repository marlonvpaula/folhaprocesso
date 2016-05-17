
  angular.module('StarterApp.controllers')

.controller('HomeCtrl', ['$scope',  
                         '$mdToast', 
                         '$mdSidenav', 
                         'Auth',
                         'empresas',
  function($scope, $mdToast, $mdSidenav, Auth, empresas){
    Auth.currentUser().then(function(user){
      empresas.get(user.empresa_id).then(function(empresa){
        $scope.empresa = empresa;
      });
    });

  $scope.openToast = function($event) {
    $mdToast.show($mdToast.simple().content('Hello!'));
    //$mdToast.showSimple('Hello');
    // Could also do $mdToast.showSimple('Hello');
  };

  
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);
