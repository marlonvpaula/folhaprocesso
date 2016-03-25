angular.module('StarterApp.controllers')

.controller('DesenhoNewCtrl', ['$scope',
															 '$state',
                               '$stateParams',
															 '$mdSidenav', 
                               '$timeout', 
                               '$q',
                               'desenhos',
			                         'grupomodelos',
                               'modelos',
function($scope, $state, $stateParams, $mdSidenav, $timeout, $q, desenhos, grupomodelos, modelos){
  $scope.grupomodelos = grupomodelos.grupomodelos;
  $scope.modelos = modelos.modelos;
	$scope.cancel = function() {
    $state.go('desenhos');
  };

  $scope.salvar = function() {
  	if(!$scope.desenho.titulo || $scope.desenho.titulo === '') { return; }
	  desenhos.create({
	    codigo: $scope.desenho.codigo,
      titulo: $scope.desenho.titulo,
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