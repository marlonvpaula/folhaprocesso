angular.module('StarterApp.controllers')

.controller('SuporteUpdateCtrl', ['$scope',
															 '$state',
															 '$stateParams',
															 '$mdSidenav', 
                               '$timeout', 
                               '$q',
                               '$mdToast',
                               'suportes',  
			                         'insertos',  
			                         'operacaos',
function($scope, $state, $stateParams, $mdSidenav, $timeout, $q, $mdToast, suportes, insertos, operacaos){
	
	suportes.get($stateParams.id).then(function(suporte){
		$scope.insertsSelected = [];
    $scope.suporte = suporte;
    $scope.suporte.operacao = suporte.operacao.id;
  	var suporte_insertos = suporte.suporte_insertos;
  	for (var i = 0; i < suporte_insertos.length; i++) {
  		$scope.insertsSelected.push(suporte_insertos[i].inserto);
	  } 
  });


  $scope.operacaos = operacaos.operacaos;
  $scope.querySearch = querySearch;
  $scope.inserts = loadInsertos();
  $scope.filterSelected = true;
	$scope.transformChip = transformChip;
  $scope.selectedItem = null;
  $scope.searchText = null;
  //$scope.insertsSelected = []; 
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
      return (inserto._lowerdescricao.indexOf(lowercaseQuery) != -1);
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
	  suportes.update($scope.suporte.id, {
      id: $scope.suporte.id,
	    descricao: $scope.suporte.descricao,
      operacao_id: $scope.suporte.operacao,
      insertos: $scope.insertsSelected,
	  });
    $mdToast.show(
      $mdToast.simple()
        .textContent('Suporte (' + $scope.suporte.descricao + ') alterado com sucesso.')
        .position("top right")
        .hideDelay(3000)
    );
    $scope.insertsSelected = [];
	  $scope.suporte.descricao = '';
    $state.go('suportes');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);