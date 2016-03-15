angular.module('StarterApp.controllers')

.controller('FolhaprocessoUpdateCtrl', ['$scope',
                                        '$state',
                                        '$stateParams',
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
                                        'raios',
function($scope, $state, $stateParams, $mdSidenav, $timeout, $q, $mdToast, folhaprocessos, suportes, insertos, grupomodelos, modelos, suportes, raios){
  
  //$scope.grupomodelos = grupomodelos.grupomodelos;
  $scope.modelos = modelos.modelos;
  $scope.suportes = suportes.suportes;
  $scope.raios = raios.raios;
  $scope.ferramentas = [];
  $scope.insertos = [];
  $scope.fabricantes = [];
  $scope.ferramentafolha = null;


  folhaprocessos.get($stateParams.id).then(function(folhaprocesso){
    $scope.insertsSelected = [];
    $scope.folhaprocesso = folhaprocesso;
    $scope.folhaprocesso.modelo = folhaprocesso.modelo.id;
    $scope.folhaprocesso.grupomodelo = folhaprocesso.grupomodelo.id;
    
    var ferramentafolhas = folhaprocesso.ferramentafolhas;
    for (var i = 0; i < ferramentafolhas.length; i++) {
      if (i = 0) {
        $scope.ferramentafolha.suporte = ferramentafolhas[i].suporte.id;
        $scope.ferramentafolha.inserto = ferramentafolhas[i].inserto.id;
        $scope.ferramentafolha.fabricante = ferramentafolhas[i].fabricante.id;
        $scope.ferramentafolha.raio = ferramentafolhas[i].raios.id;
      }
      $scope.ferramentas.push(ferramentafolhas[i]);
    } 
  });

  $scope.updateModelo = function () {
    $scope.folhaprocesso.grupomodelo = null;
    $scope.grupomodelos = [];
    modelos.get($scope.folhaprocesso.modelo).then(function(modelo){
      $scope.grupomodelos.push(modelo.grupomodelo);
      $scope.folhaprocesso.grupomodelo = modelo.grupomodelo.id;
    });
  }

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
    if (angular.isUndefined($scope.ferramentafolha.raio) || 
        $scope.ferramentafolha.raio === null || 
        $scope.ferramentafolha.raio < 0) {
      $scope.errorFerramenta = "O raio deve ser informado.";
      return;
    }
    $scope.errorFerramenta = "";

    $scope.ferramentas.push({suporte_id: $scope.ferramentafolha.suporte,
                            inserto_id: $scope.ferramentafolha.inserto,
                            fabricante_id: $scope.ferramentafolha.fabricante,
                            raio_id: $scope.ferramentafolha.raio});
    $scope.ferramentafolha = {};
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
    folhaprocessos.update($scope.folhaprocesso.id, {
      id: $scope.folhaprocesso.id,
      nrDesenho: $scope.folhaprocesso.nrDesenho,
      nomepeca: $scope.folhaprocesso.nomepeca,
      dtProjeto: $scope.folhaprocesso.dtProjeto,
      modelo_id: $scope.folhaprocesso.modelo,
      grupomodelo_id: $scope.folhaprocesso.grupomodelo,
      ferramentafolhas: $scope.ferramentas,
    });
    $scope.folhaprocesso.nomepeca = '';
    $state.go('modelos');
  };


  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);