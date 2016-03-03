angular.module('StarterApp.controllers')

.controller('InsertoCtrl', ['$scope',
														 '$state',
														 '$mdMedia',
														 '$mdDialog',
														 '$mdSidenav',
		                         'insertos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, insertos){
	$scope.insertos = insertos.insertos;


	$scope.newInserto = function() {
    $state.go('inserto');
  };

  $scope.showInserto = function(id) {
    $state.go('showInserto', { "id": id});
  };

  $scope.editarInserto = function(id) {
    $state.go('updateInserto', { "id": id});
  };

  $scope.remover = function() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		insertos.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}]);
