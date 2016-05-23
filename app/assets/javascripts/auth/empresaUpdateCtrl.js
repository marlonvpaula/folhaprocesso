angular.module('StarterApp.controllers')

.controller('EmpresaUpdateCtrl', ['$scope',
															    '$state',
															    '$mdSidenav', 
                                  '$timeout', 
                                  '$q',
                                  'Upload',
                                  'Auth',
			                            'empresas',
function($scope, $state, $mdSidenav, $timeout, $q, Upload, Auth, empresas){

  //$scope.uploader = new FileUploader();

	Auth.currentUser().then(function(user){
    empresas.get(user.empresa_id).then(function(empresa){
      $scope.empresa = empresa;
    });
  });


	$scope.cancel = function() {
    $state.go('home');
  };

  $scope.upload = function (file) {
    Upload.upload({
      url: 'empresas/' + $scope.empresa.id + '.json',
      method: 'PUT',
      headers: { 'Content-Type': false },
      fields: {
        'empresa[nome]': $scope.empresa.nome,
        'empresa[logo]': file
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
    
    //console.log($scope.uploader);
  	if(!$scope.empresa.nome || $scope.empresa.nome === '') { return; }
	  empresas.update($scope.empresa.id, {
      id: $scope.empresa.id,
	    nome: $scope.empresa.nome,
      cnpj: $scope.empresa.cnpj,
      endereco: $scope.empresa.endereco,
      numero: $scope.empresa.numero,
      bairro: $scope.empresa.bairro,
      cep: $scope.empresa.cep,
      telefone: $scope.empresa.telefone,
	  });
	  $scope.empresa.nome = '';
    $state.go('home');
    $mdToast.show(
      $mdToast.simple()
        .textContent('Empresa (' + $scope.empresa.nome + ') alterada com sucesso.')
        .position("top right")
        .hideDelay(3000)
    );
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);