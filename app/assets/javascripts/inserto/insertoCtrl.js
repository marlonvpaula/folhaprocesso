angular.module('StarterApp.controllers')

.controller('InsertoCtrl', ['$scope',
														'$state',
														'$mdMedia',
														'$mdDialog',
														'$mdSidenav',
                            '$mdToast',
		                        'insertos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, $mdToast, insertos){
	$scope.insertos = insertos.insertos;
  

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
          .title('Você tem certeza que deseja remover o(s) ' + $scope.selected.length + ' inserto(s) selecionado(s)?')
          .textContent('O(s) inserto(s) será(am) removido(s) permanentemente do sistema.')
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
  
  
	$scope.newInserto = function() {
    $state.go('inserto');
  };

  $scope.showInserto = function(id) {
    $state.go('showInserto', { "id": id});
  };

  $scope.editarInserto = function(id) {
    $state.go('updateInserto', { "id": id});
  };

  function remover () {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		insertos.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
    $mdToast.show(
      $mdToast.simple()
        .textContent('Inserto(s) removido(s) com sucesso.')
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
