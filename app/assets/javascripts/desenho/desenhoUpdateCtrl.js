angular.module('StarterApp.controllers')

.controller('DesenhoUpdateCtrl', ['$scope',
															 '$state',
                               '$stateParams',
															 '$mdSidenav', 
                               '$timeout', 
                               '$q',
                               '$mdToast',
                               'Upload',
			                         'desenhos',
			                         'grupomodelos',
                               'modelos',
function($scope, $state, $stateParams, $mdSidenav, $timeout, $q, $mdToast, Upload, desenhos, grupomodelos, modelos){
  $scope.grupomodelos = grupomodelos.grupomodelos;
  $scope.modelos = modelos.modelos;

  //$scope.uploader = new FileUploader();

	desenhos.get($stateParams.id).then(function(desenho){
		$scope.desenho = desenho;
    $scope.desenho.modelo = desenho.modelo.id;
    $scope.desenho.grupomodelo = desenho.grupomodelo.id;
  });


	$scope.cancel = function() {
    $state.go('desenhos');
  };

  $scope.upload = function (file) {
    Upload.upload({
      url: 'desenhos/' + $scope.desenho.id + '.json',
      method: 'PUT',
      headers: { 'Content-Type': false },
      fields: {
        'desenho[codigo]': $scope.desenho.codigo,
        'desenho[titulo]': $scope.desenho.titulo,
        'desenho[modelo_id]': $scope.desenho.modelo,
        'desenho[grupomodelo_id]': $scope.desenho.grupomodelo,
        'desenho[picture]': file
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
  	if(!$scope.desenho.titulo || $scope.desenho.titulo === '') { return; }
	  desenhos.update($scope.desenho.id, {
      id: $scope.desenho.id,
	    codigo: $scope.desenho.codigo,
      titulo: $scope.desenho.titulo,
      //picture: $scope.uploader,
      modelo_id: $scope.desenho.modelo,
      grupomodelo_id: $scope.desenho.grupomodelo,
	  });
    $mdToast.show(
      $mdToast.simple()
        .textContent('Desenho (' + $scope.desenho.titulo + ') alterado com sucesso.')
        .position("top right")
        .hideDelay(3000)
    );
	  $scope.desenho.titulo = '';
    $state.go('desenhos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);