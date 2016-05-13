angular.module('StarterApp.controllers')
.controller('AuthCtrl', [
'$scope',
'$state',
'$mdDialog',
'$mdSidenav',
'Auth',
'empresas',
'users',
function($scope, $state, $mdDialog, $mdSidenav, Auth, empresas, users){
  
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


  $scope.registerEmpresa = function() {
    empresas.create({
      nome: $scope.user.username,
    }).then(function(empresa){
      Auth.register($scope.user).then(function(){
        Auth.currentUser().then(function (user){
          console.log(user);
          user.empresa_id = empresa.data.id;
          users.update(user.id, user);
        });
        $mdDialog.hide();
        $state.go('home');
      });
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