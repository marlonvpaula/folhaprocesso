angular.module('StarterApp.controllers')

.controller('FolhaprocessoNewCtrl', ['$scope',
      															 '$state',
      															 '$mdSidenav', 
                                     '$timeout', 
                                     '$q',
                                     '$mdToast',
                                     'folhaprocessos',
                                     'suportes',
                                     'insertos',
                                     'grupomodelos',
                                     'modelos',   
                                     'suportes',
function($scope, $state, $mdSidenav, $timeout, $q, $mdToast, folhaprocessos, suportes, insertos, grupomodelos, modelos, suportes){
	
  $scope.grupomodelos = grupomodelos.grupomodelos;
  $scope.modelos = modelos.modelos;
  $scope.suportes = suportes.suportes;
  $scope.ferramentas = [];
  $scope.insertos = [];
  $scope.fabricantes = [];
  $scope.ferramentafolha = null;

  $scope.updateSuporte = function () {
    $scope.ferramentafolha.inserto = null;
    $scope.ferramentafolha.fabricante = null;
    $scope.insertos = [];
    $scope.fabricantes = [];
    suportes.get($scope.ferramentafolha.suporte).then(function(suporte){
      for (i = 0; i < suporte.suporte_insertos.length; i++) {
        $scope.insertos.push(suporte.suporte_insertos[i].inserto);
      }
    });
  }

  $scope.updateInserto = function () {
    $scope.ferramentafolha.fabricante = null;
    $scope.fabricantes = [];
    insertos.get($scope.ferramentafolha.inserto).then(function(inserto){
      for (i = 0; i < inserto.inserto_fabricantes.length; i++) {
        $scope.fabricantes.push(inserto.inserto_fabricantes[i].fabricante);
      }
    });
  }

  
  $scope.adicionarFerramenta = function () {
    console.log($scope.ferramentas);
    if ($scope.ferramentafolha === null) {
      $scope.errorFerramenta = "Deve ser informada as opções de Ferramenta.";
      return;
    }
    if (angular.isUndefined($scope.ferramentafolha.suporte) || 
        $scope.ferramentafolha.suporte === null || 
        $scope.ferramentafolha.suporte < 0) {
      $scope.errorFerramenta = "O ferramenta deve ser informada.";
      return;
    }
    if (angular.isUndefined($scope.ferramentafolha.inserto) || 
        $scope.ferramentafolha.inserto === null || 
        $scope.ferramentafolha.inserto < 0) {
      $scope.errorFerramenta = "O inserto deve ser informado.";
      return;
    }
    if (angular.isUndefined($scope.ferramentafolha.fabricante) || 
        $scope.ferramentafolha.fabricante === null || 
        $scope.ferramentafolha.fabricante < 0) {
      $scope.errorFerramenta = "O fabricante deve ser informado.";
      return;
    }
    $scope.errorFerramenta = "";

    $scope.ferramentas.push({suporte_id: $scope.ferramentafolha.suporte,
                             inserto_id: $scope.ferramentafolha.inserto,
                             fabricante_id: $scope.ferramentafolha.fabricante});
    $scope.ferramentafolha = {};
  }  

  $scope.removerFerramenta = function () {
    for (var i = 0; i < $scope.selected.length; i++) {
      for(var j = 0; j < $scope.ferramentas.length; j++) {
        if($scope.ferramentas[j].id === $scope.selected[i].id) {
          $scope.ferramentas.splice(j, 1);
        }
      }
    }
  }

	$scope.cancel = function() {
    $state.go('folhaprocessos');
  };

  var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
  $scope.toastPosition = angular.extend({},last);

  function showMessage(msg) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(msg)
        .position($scope.toastPosition)
        .hideDelay(3000)
    );
  };

  $scope.salvar = function() {
  	if(!$scope.folhaprocesso.nomepeca || $scope.folhaprocesso.nomepeca === '') { return; }
    if ($scope.ferramentas.length == 0) {
      showMessage("Ao menos uma ferramenta deve ser informada.");
      return;
    }
	  folhaprocessos.create({
      nrDesenho: $scope.folhaprocesso.nrDesenho,
	    nomepeca: $scope.folhaprocesso.nomepeca,
      dtProjeto: $scope.folhaprocesso.dtProjeto,
      modelo_id: $scope.folhaprocesso.modelo,
      grupomodelo_id: $scope.folhaprocesso.grupomodelo,
      ferramentafolhas: $scope.ferramentas,
	  });
	  $scope.folhaprocesso.nomepeca = '';
    $state.go('folhaprocessos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);