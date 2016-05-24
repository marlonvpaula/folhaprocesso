angular.module('StarterApp.controllers')

.controller('UsuarioUpdateCtrl', ['$scope',
															    '$state',
															    '$mdSidenav', 
                                  '$timeout', 
                                  '$mdToast',
                                  '$q',
                                  'Upload',
                                  'Auth',
			                            'users',
function($scope, $state, $mdSidenav, $timeout, $mdToast, $q, Upload, Auth, users){

  //$scope.uploader = new FileUploader();

	Auth.currentUser().then(function(usuario){
		$scope.usuario = usuario;
  });


	$scope.cancel = function() {
    $state.go('home');
  };

  $scope.upload = function (file) {
    Upload.upload({
      url: 'users/' + $scope.usuario.id + '.json',
      method: 'PUT',
      headers: { 'Content-Type': false },
      fields: {
        'user[image]': file
      },
      file: file,
      sendFieldsAs: 'json'
    }).then(function (resp) {
      console.log('Success ' + resp.config.file.name + 'uploaded. Response: ' + resp.data);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    });
  };

  $scope.salvar = function() {
    
  	if(!$scope.usuario.username || $scope.usuario.username === '') { return; }
	  users.update($scope.usuario.id, {
      id: $scope.usuario.id,
	    username: $scope.usuario.username,
	  });
    $state.go('home');
    $mdToast.show(
      $mdToast.simple()
        .textContent('Usuário (' + $scope.usuario.username + ') alterado com sucesso.')
        .position("top right")
        .hideDelay(3000)
    );
  };

  $scope.salvarSenha = function() {
    /*if (!$scope.usuario.passwordAtual == $scope.usuario.password) {

    }
    if (!$scope.usuario.passwordConfirm == $scope.usuario.passwordNew) {

    }*/
  	if(!$scope.usuario.password || $scope.usuario.password === '') { return; }
	  users.update($scope.usuario.id, {
      id: $scope.usuario.id,
	    password: $scope.usuario.password
	  });
    $state.go('home');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);