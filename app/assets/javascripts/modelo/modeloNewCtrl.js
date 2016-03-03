angular.module('StarterApp.controllers')

.controller('ModeloNewCtrl', ['$scope',
															 '$state',
															 '$mdSidenav', 
                               '$timeout', 
                               '$q',
                               'modelos',  
			                         'grupomodelos', 
function($scope, $state, $mdSidenav, $timeout, $q, modelos, grupomodelos){
	
  $scope.grupomodelos = grupomodelos.grupomodelos;
  

	$scope.cancel = function() {
    $state.go('modelos');
  };

  $scope.salvar = function() {
  	if(!$scope.modelo.descricao || $scope.modelo.descricao === '') { return; }
	  modelos.create({
	    descricao: $scope.modelo.descricao,
      grupomodelo_id: $scope.modelo.grupomodelo,
	  });
	  $scope.modelo.descricao = '';
    $state.go('modelos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);