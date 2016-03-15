angular.module('StarterApp.controllers')

.controller('RaioCtrl', ['$scope',
														 '$state',
														 '$mdMedia',
														 '$mdDialog',
														 '$mdSidenav',
		                         'raios',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, raios){
	$scope.raios = raios.raios;


	function showAdvanced(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'DialogRaioController',
      templateUrl: 'raio/_newRaio.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: {
        raio: $scope.raio
      },
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


  $scope.novo = function (ev) {
    $scope.raio = null;
    showAdvanced(ev);
  }


  $scope.editar = function (id, ev) {
    raios.get(id).then(function(raio){
      $scope.raio = raio;
      showAdvanced(ev);
    });
  }

  $scope.remover = function() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		raios.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}])
.controller('DialogRaioController', ['$scope',
                                      '$mdDialog',
                                      'raios',
                                      'raio',
function ($scope, $mdDialog, raios, raio) {
    var update = false;
    if (raio != null) {
      update = true;
      $scope.raio = raio;
      $scope.raio.valor = parseFloat(raio.valor);
    }
    else {
      update = false;
      $scope.raio = {};
    }

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.salvar = function() {
      if(!$scope.raio.valor || $scope.raio.valor === '') { return; }
      if (update) {
        raios.update($scope.raio.id, {
          id: $scope.raio.id,
          valor: $scope.raio.valor,
        });
      }
      else {
        raios.create({
          valor: $scope.raio.valor,
        });
      }
      $scope.raio.valor = '';
      $mdDialog.hide();
    };
}]);
