angular.module('StarterApp.controllers')

.controller('DesenhoUpdateCtrl', ['$scope',
															 '$state',
                               '$stateParams',
															 '$mdSidenav', 
                               '$timeout', 
                               'FileUploader',
                               '$q',
			                         'desenhos',
			                         'grupomodelos',
                               'modelos',
function($scope, $state, $stateParams, $mdSidenav, $timeout, FileUploader, $q, desenhos, grupomodelos, modelos){
  $scope.grupomodelos = grupomodelos.grupomodelos;
  $scope.modelos = modelos.modelos;

  $scope.uploader = new FileUploader();

	desenhos.get($stateParams.id).then(function(desenho){
		$scope.desenho = desenho;
    $scope.desenho.modelo = desenho.modelo.id;
    $scope.desenho.grupomodelo = desenho.grupomodelo.id;
  });


	$scope.cancel = function() {
    $state.go('desenhos');
  };

  $scope.salvar = function() {
    
    console.log($scope.uploader);
  	if(!$scope.desenho.titulo || $scope.desenho.titulo === '') { return; }
	  desenhos.update($scope.desenho.id, {
      id: $scope.desenho.id,
	    codigo: $scope.desenho.codigo,
      titulo: $scope.desenho.titulo,
      picture: $scope.uploader,
      modelo_id: $scope.desenho.modelo,
      grupomodelo_id: $scope.desenho.grupomodelo,
	  });
	  $scope.desenho.titulo = '';
    $state.go('desenhos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);