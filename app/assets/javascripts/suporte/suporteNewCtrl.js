angular.module('StarterApp.controllers')

.controller('SuporteNewCtrl', ['$scope',
															 '$state',
															 '$mdSidenav', 
                               '$timeout', 
                               '$q',
                               'suportes',  
			                         'insertos',  
			                         'operacaos',
function($scope, $state, $mdSidenav, $timeout, $q, suportes, insertos, operacaos){
	
  $scope.operacaos = operacaos.operacaos;
  $scope.querySearch = querySearch;
  $scope.inserts = loadInsertos();
  $scope.filterSelected = true;
	$scope.transformChip = transformChip;
  $scope.selectedItem = null;
  $scope.searchText = null;
  $scope.insertsSelected = []; 
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
    var results = query ? $scope.inserts.filter(createFilterFor(query)) : [];
    return results;
  }
  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(inserto) {
      return (inserto._lowerdescricao.indexOf(lowercaseQuery) == 0);
    };
  }

  function loadInsertos() {
    var inserts = insertos.insertos;

    return inserts.map(function (ins) {
      ins._lowerdescricao = ins.descricao.toLowerCase();
      return ins;
    });
  }




	$scope.cancel = function() {
    $state.go('suportes');
  };

  $scope.salvar = function() {
  	if(!$scope.suporte.descricao || $scope.suporte.descricao === '') { return; }
    console.log($scope.suporte.operacao);
	  suportes.create({
	    descricao: $scope.suporte.descricao,
      operacao_id: $scope.suporte.operacao,
      insertos: $scope.insertsSelected,
	  });
    $scope.insertsSelected = [];
	  $scope.suporte.descricao = '';
    $state.go('suportes');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);