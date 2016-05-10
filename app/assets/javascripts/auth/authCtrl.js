angular.module('StarterApp.controllers')
.controller('AuthCtrl', [
'$scope',
'$state',
'$mdDialog',
'$mdSidenav',
'Auth',
function($scope, $state, $mdDialog, $mdSidenav, Auth){
  
	$scope.showHints = true;

  $scope.login = function() {
    Auth.login($scope.user).then(function(){
      $state.go('home');
      $scope.error = '';
      $mdDialog.hide();
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


  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

}]);