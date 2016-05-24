angular.module('StarterApp.controllers')

.controller('ModeloNewCtrl', ['$scope',
															 '$state',
															 '$mdSidenav', 
                               '$timeout', 
                               '$q',
                               '$mdToast',
                               'modelos',  
			                         'grupomodelos', 
function($scope, $state, $mdSidenav, $timeout, $q, $mdToast, modelos, grupomodelos){
	
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
    $mdToast.show(
      $mdToast.simple()
        .textContent('Máquina (' + $scope.modelo.descricao + ') salvo com sucesso.')
        .position("top right")
        .hideDelay(3000)
    );
	  $scope.modelo.descricao = '';
    $state.go('modelos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);