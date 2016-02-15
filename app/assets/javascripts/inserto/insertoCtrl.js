angular.module('StarterApp.controllers')

.controller('InsertoCtrl', ['$scope',
														 '$state',
														 '$mdMedia',
														 '$mdDialog',
														 '$mdSidenav',
		                         'insertos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, insertos){
	$scope.insertos = insertos.insertos;


	$scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'inserto/_newInsertos.html',
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
  		insertos.remove(
		    $scope.selected[i].id
		  );
		  $scope.selected = {};
  	}
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

  function DialogController($scope, $mdDialog, insertos) {
	  $scope.hide = function() {
	    $mdDialog.hide();
	  };
	  $scope.cancel = function() {
	    $mdDialog.cancel();
	  };
	  $scope.salvar = function() {
	  	if(!$scope.inserto.descricao || $scope.inserto.descricao === '') { return; }
		  insertos.create({
		    descricao: $scope.inserto.descricao,
		  });
		  $scope.inserto.descricao = '';
	    $mdDialog.hide();
	  };
	}
}]);
