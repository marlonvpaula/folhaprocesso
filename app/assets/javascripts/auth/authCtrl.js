angular.module('StarterApp.controllers')
.controller('AuthCtrl', [
            '$scope',
            '$state',
            '$mdDialog',
            '$mdSidenav',
            '$mdDialog',
            'Auth',
            'empresas',
            'users',
function($scope, $state, $mdDialog, $mdSidenav, $mdDialog, Auth, empresas, users){
  
	$scope.showHints = true;
  $scope.userRole = 0;
  $scope.Permissoes = [{value: 0, description: "normal"},
    {value: 1, description: "admin"},
  ];

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
    /*Auth.register($scope.user).then(function(){
      $state.go('home');
    });*/
    Auth.currentUser().then(function (userLog){
      Auth.register($scope.user).then(function(user){
        user.empresa_id = userLog.empresa_id;
        if ($scope.userRole = 0) {
          user.role = "normal";
        } else if ($scope.userRole = 1){
          user.role = "admin";
        }
        users.update(user.id, user);
        $state.go('home');
        $mdToast.show(
          $mdToast.simple()
            .textContent('Usuário (' + user.username + ') cadastrado com sucesso.')
            .position("top right")
            .hideDelay(3000)
        );
      });
    });
  };


  $scope.registerEmpresa = function() {
    empresas.create({
      nome: $scope.user.username,
    }).then(function(empresa){
      Auth.register($scope.user).then(function(){
        Auth.currentUser().then(function (user){
          user.empresa_id = empresa.data.id;
          user.role = "admin";
          users.update(user.id, user);
        });
        $mdDialog.hide();
        $state.go('home');
        $mdToast.show(
          $mdToast.simple()
            .textContent('Empresa (' + user.username + ') registrada com sucesso.')
            .position("top right")
            .hideDelay(3000)
        );
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