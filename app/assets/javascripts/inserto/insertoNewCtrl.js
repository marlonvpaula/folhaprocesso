angular.module('StarterApp.controllers')

.controller('InsertoNewCtrl', ['$scope',
															 '$state',
                               '$stateParams',
															 '$mdSidenav', 
                               '$timeout', 
                               '$q',
                               '$mdToast',
			                         'insertos',  
			                         'fabricantes',
function($scope, $state, $stateParams, $mdSidenav, $timeout, $q, $mdToast, insertos,fabricantes){



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
      return (fabricante._lowerdescricao.indexOf(lowercaseQuery) != -1);
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
      raio: $scope.inserto.raio,
      fabricantes: $scope.fabricsSelected,
	  });
    $mdToast.show(
      $mdToast.simple()
        .textContent('Inserto (' + $scope.inserto.descricao + ') salvo com sucesso.')
        .position("top right")
        .hideDelay(3000)
    );
    $scope.fabricsSelected = [];
	  $scope.inserto.descricao = '';
    $state.go('insertos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);