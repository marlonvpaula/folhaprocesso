angular.module('StarterApp.controllers')

.controller('FolhaprocessoShowCtrl',['$scope',
															 '$state',
															 '$stateParams',
															 '$mdSidenav',
			                         'folhaprocessos',  
			                         'folhaprocesso',
function($scope, $state, $stateParams, $mdSidenav, folhaprocessos, folhaprocesso){
	$scope.folhaprocesso = folhaprocesso;

	$scope.voltar = function() {
    $state.go('folhaprocessos');
  };
  
  $scope.editar = function(id) {
    $state.go('updateFolhaprocesso', { "id": id});
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);