angular.module('StarterApp.controllers')

.controller('FolhaprocessoRelCtrl',['$scope',
																		'$rootScope',
																		'$state',
																		'$stateParams',
																		'$mdSidenav',
						                        'folhaprocessos',  
						                        'folhaprocesso',
						                        'Auth',
						                        'empresas',
function($scope, $rootScope, $state, $stateParams, $mdSidenav, folhaprocessos, folhaprocesso, Auth, empresas){
	
	$rootScope.ngShow = false;

	Auth.currentUser().then(function(user){
    empresas.get(user.empresa_id).then(function(empresa){
      $scope.empresa = empresa;
    });
  });
	$scope.folhaprocesso = folhaprocesso;

	$scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);