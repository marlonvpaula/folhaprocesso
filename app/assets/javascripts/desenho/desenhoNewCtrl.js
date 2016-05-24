angular.module('StarterApp.controllers')

.controller('DesenhoNewCtrl', ['$scope',
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

  $scope.desenho = {};
/*
  $scope.uploader = new FileUploader({url: '/desenhos.json',
                                      method: 'POST',
                                      alias:  'picture',
                                      removeAfterUpload:  true,
                                      //headers: {'X-CSRF-TOKEN': csrf_token,'accept': 'application/json'},
                                      withCredentials: true
                                      //fileFormDataName: 'desenho[picture]'
                                      });


  $scope.uploader.onBeforeUploadItem = function(item) {
    item.formData.push({
      'desenho[codigo]': $scope.desenho.codigo,
      'desenho[titulo]': $scope.desenho.titulo
                                      
      //"recipe": angular.toJson($scope.recipe)
    });
    console.info('uploader', $scope.uploader);
    return uploader.uploadAll();
  };
*/
	$scope.cancel = function() {
    $state.go('desenhos');
  };
/*
  $scope.upload = function (files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log("File: " + file);
        $scope.upload = Upload.upload({
            url: '/desenhos.json',
            method: 'POST',
            data: { 'desenho[codigo]': $scope.desenho.codigo,
                      'desenho[titulo]': $scope.desenho.titulo },
            file: file,
            fileFormDataName: 'desenho[picture]'
        });
    }
  }
*/


  $scope.upload = function (file) {
    $scope.desenho.picture = file;
    /*Upload.upload({
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
    });*/
  };


  $scope.salvar = function() {
    console.log("Salvar: ");
  	if(!$scope.desenho.titulo || $scope.desenho.titulo === '') { return; }
	  desenhos.create({
	    codigo: $scope.desenho.codigo,
      titulo: $scope.desenho.titulo,
      picture: $scope.desenho.picture,
      modelo_id: $scope.desenho.modelo,
      grupomodelo_id: $scope.desenho.grupomodelo,
	  });
    $mdToast.show(
      $mdToast.simple()
        .textContent('Desenho (' + $scope.desenho.titulo + ') salvo com sucesso.')
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