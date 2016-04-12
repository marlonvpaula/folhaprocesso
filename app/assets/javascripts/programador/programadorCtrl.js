angular.module('StarterApp.controllers')

.controller('ProgramadorCtrl', ['$scope',
														 '$state',
														 '$mdMedia',
														 '$mdDialog',
														 '$mdSidenav',
		                         'programadors',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, programadors){
	$scope.programadors = programadors.programadors;


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
          .title('Você tem certeza que deseja remover o(s) ' + $scope.selected.length + ' programador(es) selecionado(s)?')
          .textContent('O(s) programador(es) será(am) removido(s) permanentemente do sistema.')
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
  
	function showAdvanced(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'DialogProgrController',
      templateUrl: 'programador/_newProgramador.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: {
        programador: $scope.programador
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
    $scope.programador = null;
    showAdvanced(ev);
  }


  $scope.editar = function (id, ev) {
    programadors.get(id).then(function(programador){
      $scope.programador = programador;
      showAdvanced(ev);
    });
  }

  function remover () {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		programadors.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
  }


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}])
.controller('DialogProgrController', ['$scope',
                                      '$mdDialog',
                                      'programadors',
                                      'programador',
function ($scope, $mdDialog, programadors, programador) {
    var update = false;
    if (programador != null) {
      update = true;
      $scope.programador = programador;
    }
    else {
      update = false;
      $scope.programador = {};
    }

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.salvar = function() {
      if(!$scope.programador.nome || $scope.programador.nome === '') { return; }
      if (update) {
        programadors.update($scope.programador.id, {
          id: $scope.programador.id,
          nome: $scope.programador.nome,
        });
      }
      else {
        programadors.create({
          nome: $scope.programador.nome,
        });
      }
      $scope.programador.nome = '';
      $mdDialog.hide();
    };
}]);
