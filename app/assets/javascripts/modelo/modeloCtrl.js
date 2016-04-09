angular.module('StarterApp.controllers')

.controller('ModeloCtrl', ['$scope',
														'$state',
														'$mdMedia',
														'$mdDialog',
														'$mdSidenav',
		                        'modelos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, modelos){
	$scope.modelos = modelos.modelos;

  
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];
  
  $scope.filter = {
    show: false,
    search: ''
  };

  $scope.query = {
    order: 'id',
    limit: 5,
    page: 1
  };

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.filter.search = '';
  }
  

	$scope.newModelo = function() {
    $state.go('modelo');
  };

  $scope.showModelo = function(id) {
    $state.go('showModelo', { "id": id});
  };

  $scope.editarModelo = function(id) {
    $state.go('updateModelo', { "id": id});
  };

  $scope.remover = function() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		modelos.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.demo = {
    showTooltip : false,
    tipDirection : ''
  };
  $scope.demo.delayTooltip = undefined;
  $scope.$watch('demo.delayTooltip',function(val) {
    $scope.demo.delayTooltip = parseInt(val, 10) || 0;
  });
  $scope.$watch('demo.tipDirection',function(val) {
    if (val && val.length ) {
      $scope.demo.showTooltip = true;
    }
  });
  
}]);
