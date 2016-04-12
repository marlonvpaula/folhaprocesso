angular.module('StarterApp.controllers')

.controller('ModeloCtrl', ['$scope',
														'$state',
														'$mdMedia',
														'$mdDialog',
														'$mdSidenav',
		                        'modelos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, modelos){
	$scope.modelos = modelos.modelos;

  
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

  $scope.delete = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Você tem certeza que deseja remover a(s) ' + $scope.selected.length + ' Maquina(s) selecionada(s)?')
          .textContent('A(s) maquina(s) será(am) removida(s) permanentemente do sistema.')
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

  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.filter.search = '';
  }
  

	$scope.newModelo = function() {
    $state.go('modelo');
  };

  $scope.showModelo = function(id) {
    $state.go('showModelo', { "id": id});
  };

  $scope.editarModelo = function(id) {
    $state.go('updateModelo', { "id": id});
  };

  function remover () {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		modelos.remove(
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
  
}]);
