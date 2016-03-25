angular.module('StarterApp.controllers')
.controller('AuthCtrl', [
'$scope',
'$state',
'$mdSidenav',
'Auth',
function($scope, $state, $mdSidenav, Auth){

	$scope.showHints = true;

  $scope.login = function() {
    Auth.login($scope.user).then(function(){
      $state.go('home');
      $scope.error = '';
    }, function(error) {
      $scope.error = 'Usuário ou senha incorreta!';
    });
  };

  $scope.register = function() {
    Auth.register($scope.user).then(function(){
      $state.go('home');
    });
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

}]);