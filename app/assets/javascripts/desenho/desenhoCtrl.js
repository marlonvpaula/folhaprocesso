angular.module('StarterApp.controllers')

.controller('DesenhoCtrl', ['$scope',
														 '$state',
														 '$mdMedia',
														 '$mdDialog',
														 '$mdSidenav',
		                         'desenhos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, desenhos){
	$scope.desenhos = desenhos.desenhos;
  
  
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
  
	$scope.newDesenho = function() {
    $state.go('desenho');
  };

  $scope.showDesenho = function(id) {
    $state.go('showDesenho', { "id": id});
  };

  $scope.editarDesenho = function(id) {
    $state.go('updateDesenho', { "id": id});
  };

  $scope.remover = function() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		desenhos.remove(
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
