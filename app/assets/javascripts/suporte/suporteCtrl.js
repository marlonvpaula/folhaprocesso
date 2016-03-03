angular.module('StarterApp.controllers')

.controller('SuporteCtrl', ['$scope',
														'$state',
														'$mdMedia',
														'$mdDialog',
														'$mdSidenav',
		                        'suportes',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, suportes){
	$scope.suportes = suportes.suportes;


	$scope.newSuporte = function() {
    $state.go('suporte');
  };

  $scope.showSuporte = function(id) {
    $state.go('showSuporte', { "id": id});
  };

  $scope.editarSuporte = function(id) {
    $state.go('updateSuporte', { "id": id});
  };

  $scope.remover = function() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		suportes.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}]);
