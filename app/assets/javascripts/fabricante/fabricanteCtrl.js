angular.module('StarterApp.controllers')

.controller('FabricanteCtrl', ['$scope',
															 '$state',
															 '$mdMedia',
															 '$mdDialog',
															 '$mdSidenav',
			                         'fabricantes',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, fabricantes){
	$scope.fabricantes = fabricantes.fabricantes;


	$scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'fabricante/_newFabricante.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  $scope.remover = function() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		fabricantes.remove(
		    $scope.selected[i].id
		  );
		  $scope.selected = {};
  	}
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

  function DialogController($scope, $mdDialog, fabricantes) {
	  $scope.hide = function() {
	    $mdDialog.hide();
	  };
	  $scope.cancel = function() {
	    $mdDialog.cancel();
	  };
	  $scope.salvar = function() {
	  	if(!$scope.fabricante.descricao || $scope.fabricante.descricao === '') { return; }
		  fabricantes.create({
		    descricao: $scope.fabricante.descricao,
		  });
		  $scope.fabricante.descricao = '';
	    $mdDialog.hide();
	  };
	}
}]);
