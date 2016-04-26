angular.module('StarterApp.controllers')

.controller('FolhaprocessoRelCtrl',['$scope',
																		'$rootScope',
																		'$state',
																		'$stateParams',
																		'$mdSidenav',
						                        'folhaprocessos',  
						                        'folhaprocesso',
function($scope, $rootScope, $state, $stateParams, $mdSidenav, folhaprocessos, folhaprocesso){
	
	$rootScope.ngShow = false;

	$scope.folhaprocesso = folhaprocesso;

	$scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);