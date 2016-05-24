angular.module('StarterApp.controllers')

.controller('SuporteCtrl', ['$scope',
														'$state',
														'$mdMedia',
														'$mdDialog',
														'$mdSidenav',
                            '$mdToast',
		                        'suportes',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, $mdToast, suportes){
	$scope.suportes = suportes.suportes;

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
          .title('Você tem certeza que deseja remover a(s) ' + $scope.selected.length + ' Ferramenta(s) selecionada(s)?')
          .textContent('A(s) ferramenta(s) será(am) removida(s) permanentemente do sistema.')
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

	$scope.newSuporte = function() {
    $state.go('suporte');
  };

  $scope.showSuporte = function(id) {
    $state.go('showSuporte', { "id": id});
  };

  $scope.editarSuporte = function(id) {
    $state.go('updateSuporte', { "id": id});
  };

  $scope.remover = function() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		suportes.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
    $mdToast.show(
      $mdToast.simple()
        .textContent('Suporte(s) removido(s) com sucesso.')
        .position("top right")
        .hideDelay(3000)
    );
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
