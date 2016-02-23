angular.module('StarterApp.controllers')

.controller('InsertoNewCtrl', ['$scope',
															 '$state',
															 '$mdSidenav', 
                               '$timeout', 
                               '$q',
			                         'insertos',  
			                         'fabricantes',
function($scope, $state, $mdSidenav, $timeout, $q, insertos,fabricantes){
	

  $scope.querySearch = querySearch;
  $scope.fabrics = loadFabricantes();
  $scope.filterSelected = true;
	$scope.transformChip = transformChip;
  $scope.selectedItem = null;
  $scope.searchText = null;
  $scope.fabricsSelected = []; 
  $scope.autocompleteDemoRequireMatch = true;
  
  /**
   * Return the proper object when the append is called.
   */
  function transformChip(chip) {
    // If it is an object, it's already a known chip
    if (angular.isObject(chip)) {
      return chip;
    }
    // Otherwise, create a new one
    return { id: chip.id, descricao: chip.descricao }
  }
  /**
   * Search for vegetables.
   */
  function querySearch (query) {
    var results = query ? $scope.fabrics.filter(createFilterFor(query)) : [];
    return results;
  }
  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(fabricante) {
      return (fabricante._lowerdescricao.indexOf(lowercaseQuery) == 0);
    };
  }

  function loadFabricantes() {
    var fabrics = fabricantes.fabricantes;

    return fabrics.map(function (fab) {
      fab._lowerdescricao = fab.descricao.toLowerCase();
      return fab;
    });
  }




	$scope.cancel = function() {
    $state.go('insertos');
  };

  $scope.salvar = function() {
  	if(!$scope.inserto.descricao || $scope.inserto.descricao === '') { return; }
	  insertos.create({
	    descricao: $scope.inserto.descricao,
      fabricantes: $scope.fabricsSelected,
	  });
    $scope.fabricsSelected = [];
	  $scope.inserto.descricao = '';
    $state.go('insertos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);