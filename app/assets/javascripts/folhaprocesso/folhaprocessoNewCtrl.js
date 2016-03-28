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
                                     'operacaos',
                                     'desenhos',   
                                     'programadors',
function($scope, $state, $mdSidenav, $timeout, $q, $mdToast, folhaprocessos, suportes, insertos, operacaos, desenhos, programadors){
	
  $scope.operacaos = operacaos.operacaos;
  $scope.programadors = programadors.programadors;
  $scope.suportes = suportes.suportes;
  $scope.grupomodelos = [];
  $scope.modelos = [];
  $scope.ferramentas = [];
  $scope.insertos = [];
  $scope.fabricantes = [];
  $scope.ferramentafolha = null;

  $scope.posicaos = [
    {id: 01, descricao: 'T01'},
    {id: 02, descricao: 'T02'},
    {id: 03, descricao: 'T03'},
    {id: 04, descricao: 'T04'},
    {id: 05, descricao: 'T05'},
    {id: 06, descricao: 'T06'},
    {id: 07, descricao: 'T07'},
    {id: 08, descricao: 'T08'},
    {id: 09, descricao: 'T09'},
    {id: 10, descricao: 'T10'},
    {id: 11, descricao: 'T11'},
    {id: 12, descricao: 'T12'},
    {id: 13, descricao: 'T13'},
    {id: 14, descricao: 'T14'},
    {id: 15, descricao: 'T15'},
    {id: 16, descricao: 'T16'},
    {id: 17, descricao: 'T17'},
    {id: 18, descricao: 'T18'},
    {id: 19, descricao: 'T19'},
    {id: 20, descricao: 'T20'},
  ];
  
  $scope.updateDesenho = function () {
    desenhos.getCodigo($scope.folhaprocesso.desenho.codigo).then(function(desenho){
      $scope.folhaprocesso.desenho = desenho[0];
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
    if (angular.isUndefined($scope.ferramentafolha.posicao) || 
        $scope.ferramentafolha.posicao === null || 
        $scope.ferramentafolha.posicao < 0) {
      $scope.errorFerramenta = "A posição da ferramenta deve ser informada.";
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
    if (angular.isUndefined($scope.ferramentafolha.altura) || 
        $scope.ferramentafolha.altura === null || 
        $scope.ferramentafolha.altura === '') {
      $scope.errorFerramenta = "A altura da ferramenta deve ser informada.";
      return;
    }
    $scope.errorFerramenta = "";


    var suporteGet = null;
    for (var i = 0; i < $scope.suportes.length; i++) {
      if ($scope.suportes[i].id = $scope.ferramentafolha.suporte) {
        suporteGet = $scope.suportes[i];
      }
    }

    var insertoGet = null;
    for (var i = 0; i < $scope.insertos.length; i++) {
      if ($scope.insertos[i].id = $scope.ferramentafolha.inserto) {
        insertoGet = $scope.insertos[i];
      }
    }

    var fabricanteGet = null;
    for (var i = 0; i < $scope.fabricantes.length; i++) {
      if ($scope.fabricantes[i].id = $scope.ferramentafolha.fabricante) {
        fabricanteGet = $scope.fabricantes[i];
      }
    }

    $scope.ferramentas.push({posicao: $scope.ferramentafolha.posicao,
                             suporte: {id: $scope.ferramentafolha.suporte,
                                       descricao: suporteGet.descricao
                                      },
                             inserto: {id: $scope.ferramentafolha.inserto,
                                       descricao: insertoGet.descricao
                                      },
                             fabricante: {id: $scope.ferramentafolha.fabricante,
                                          descricao: fabricanteGet.descricao
                                         },
                             altura: $scope.ferramentafolha.altura
                            });
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
      operacao_id: $scope.folhaprocesso.operacao,
      programador_id: $scope.folhaprocesso.programador,
      desenho_id: $scope.folhaprocesso.desenho,
	    nomepeca: $scope.folhaprocesso.nomepeca,
      dtProjeto: $scope.folhaprocesso.dtProjeto,
      ferramentafolhas: $scope.ferramentas,
	  });
	  $scope.folhaprocesso.nomepeca = '';
    $state.go('folhaprocessos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  

}]);