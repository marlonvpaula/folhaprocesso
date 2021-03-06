angular.module('StarterApp.controllers')

.controller('DesenhoCtrl', ['$scope',
														 '$state',
														 '$mdMedia',
														 '$mdDialog',
														 '$mdSidenav',
                             '$mdToast',
		                         'desenhos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, $mdToast, desenhos){
	$scope.desenhos = desenhos.desenhos;
  
  
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
          .title('Você tem certeza que deseja remover o(s) ' + $scope.selected.length + ' desenho(s) selecionado(s)?')
          .textContent('O(s) desenho(s) será(am) removido(s) permanentemente do sistema.')
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
  
	$scope.newDesenho = function() {
    $state.go('desenho');
  };

  $scope.showDesenho = function(id) {
    $state.go('showDesenho', { "id": id});
  };

  $scope.editarDesenho = function(id) {
    $state.go('updateDesenho', { "id": id});
  };

  function remover () {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		desenhos.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
    $mdToast.show(
      $mdToast.simple()
        .textContent('Desenho(s) removido(s) com sucesso.')
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
