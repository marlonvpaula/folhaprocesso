angular.module('StarterApp.controllers')

.controller('ModeloUpdateCtrl', ['$scope',
															   '$state',
															   '$stateParams',
															   '$mdSidenav', 
                                 '$timeout', 
                                 '$q',
                                 '$mdToast',
                                 'modelos',  
			                           'grupomodelos',
function($scope, $state, $stateParams, $mdSidenav, $timeout, $q, $mdToast, modelos, grupomodelos){
	
	modelos.get($stateParams.id).then(function(modelo){
		$scope.modelo = modelo;
    $scope.modelo.grupomodelo = modelo.grupomodelo_id;
  });

  $scope.grupomodelos = grupomodelos.grupomodelos;
  
	$scope.cancel = function() {
    $state.go('modelos');
  };

  $scope.salvar = function() {
    if(!$scope.modelo.descricao || $scope.modelo.descricao === '') { return; }
    modelos.update($scope.modelo.id, {
      descricao: $scope.modelo.descricao,
      grupomodelo_id: $scope.modelo.grupomodelo,
    });
    $mdToast.show(
      $mdToast.simple()
        .textContent('Máquina (' + $scope.modelo.descricao + ') alterado com sucesso.')
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