angular.module('StarterApp.controllers')

.controller('FabricanteCtrl', ['$scope',
															 '$state',
															 '$mdMedia',
															 '$mdDialog',
															 '$mdSidenav',
			                         'fabricantes',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, fabricantes){
	$scope.fabricantes = fabricantes.fabricantes;

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

  $scope.delete = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Você tem certeza que deseja remover o(s) ' + $scope.selected.length + ' fabricante(s) selecionado(s)?')
          .textContent('O(s) fabricante(s) será(am) removido(s) permanentemente do sistema.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Remover')
          .cancel('Cancelar');
    $mdDialog.show(confirm).then(function() {
      remover();
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  }

  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };

	function showAdvanced(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'DialogFabriController',
      templateUrl: 'fabricante/_newFabricante.html',
      parent: angular.element(document.body),
      locals: {
        fabricante: $scope.fabricante
      },
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

  $scope.novo = function (ev) {
    $scope.fabricante = null;
    showAdvanced(ev);
  }


  $scope.editar = function (id, ev) {
    fabricantes.get(id).then(function(fabricante){
      $scope.fabricante = fabricante;
      showAdvanced(ev);
    });
  }

  function remover () {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		fabricantes.remove(
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
  

  
}])
.controller('DialogFabriController', ['$scope',
                                      '$mdDialog',
                                      'fabricantes',
                                      'fabricante',
function ($scope, $mdDialog, fabricantes, fabricante) {
    var update = false;
    if (fabricante != null) {
      update = true;
      $scope.fabricante = fabricante;
    }
    else {
      update = false;
      $scope.fabricante = {};
    }

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.salvar = function() {
      if(!$scope.fabricante.descricao || $scope.fabricante.descricao === '') { return; }
      if (update) {
        fabricantes.update($scope.fabricante.id, {
          id: $scope.fabricante.id,
          descricao: $scope.fabricante.descricao,
        });
      }
      else {
        fabricantes.create({
          descricao: $scope.fabricante.descricao,
        });
      }
      $scope.fabricante.descricao = '';
      $mdDialog.hide();
    };
}]);
