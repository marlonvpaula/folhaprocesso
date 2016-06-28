angular.module('StarterApp.controllers')

.controller('FolhaprocessoNewCtrl', ['$scope',
      															 '$state',
                                     '$mdMedia',
                                     '$mdDialog',
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
                                     'acessorios',   
                                     'comandos',
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, $timeout, $q, $mdToast, folhaprocessos, suportes, insertos, operacaos, desenhos, programadors, acessorios, comandos){
	$scope.update = false;
  $scope.operacaos = operacaos.operacaos;
  $scope.programadors = programadors.programadors;
  $scope.suportes = suportes.suportes;
  $scope.ferramentas = [];
  $scope.insertos = [];
  $scope.fabricantes = [];
  $scope.ferramentafolha = null;

  
  $scope.selected = [];
  $scope.limitOptions = [5];

  $scope.query = {
    order: 'posicao',
    limit: 5,
    page: 1
  };

  
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


  $scope.querySearchA = querySearchA;
  $scope.querySearchC = querySearchC;
  $scope.acessors = loadAcessorios();
  $scope.comands = loadComandos();
  $scope.filterSelected = true;
  $scope.transformChip = transformChip;
  $scope.selectedItemA = null;
  $scope.selectedItemC = null;
  $scope.searchTextA = null;
  $scope.searchTextC = null;
  $scope.acessorsSelected = []; 
  $scope.comandsSelected = []; 
  $scope.autocompleteDemoRequireMatch = true;
  
  /**
   * Return the proper object when the append is called.
   */
  function transformChip(chip) {
    // If it is an object, it's already a known chip
    if (angular.isObject(chip)) {
      return chip;
    }
    // Otherwise, create a new one
    return { id: chip.id, descricao: chip.descricao }
  }
  /**
   * Search for vegetables.
   */
  function querySearchA (query) {
    var results = query ? $scope.acessors.filter(createFilterForA(query)) : [];
    return results;
  }
  /**
   * Search for vegetables.
   */
  function querySearchC (query) {
    var results = query ? $scope.comands.filter(createFilterForC(query)) : [];
    return results;
  }
  /**
   * Create filter function for a query string
   */
  function createFilterForA(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(acessorio) {
      return (acessorio._lowerdescricao.indexOf(lowercaseQuery) != -1);
    };
  }
  /**
   * Create filter function for a query string
   */
  function createFilterForC(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(comando) {
      return (comando._lowerdescricao.indexOf(lowercaseQuery) != -1);
    };
  }


  function loadAcessorios() {
    var acessors = acessorios.acessorios;

    return acessors.map(function (ace) {
      ace._lowerdescricao = ace.descricao.toLowerCase();
      return ace;
    });
  }

  function loadComandos() {
    var comands = comandos.comandos;

    return comands.map(function (com) {
      com._lowerdescricao = com.descricao.toLowerCase();
      return com;
    });
  }


  
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
    var ferramentas = [];
    for (var i = 0; i < $scope.ferramentas.length; i++) {
      ferramentas.push({posicao: $scope.ferramentas[i].posicao,
                        suporte_id: $scope.ferramentas[i].suporte.id,
                        inserto_id: $scope.ferramentas[i].inserto.id,
                        fabricante_id: $scope.ferramentas[i].fabricante.id,
                        altura: $scope.ferramentas[i].altura
                      });
    }
	  folhaprocessos.create({
      operacao_id: $scope.folhaprocesso.operacao,
      programador_id: $scope.folhaprocesso.programador,
      desenho_id: $scope.folhaprocesso.desenho.id,
	    nomepeca: $scope.folhaprocesso.nomepeca,
      dtProjeto: $scope.folhaprocesso.dtProjeto,
      tempo: $scope.folhaprocesso.tempo,
      acessoriofolhas: $scope.acessorsSelected,
      comandofolhas: $scope.comandsSelected,
      ferramentafolhas: ferramentas,
	  });
    $mdToast.show(
      $mdToast.simple()
        .textContent('Folha de Processo (' + $scope.folhaprocesso.nomepeca + ') salvo com sucesso.')
        .position("top right")
        .hideDelay(3000)
    );
	  $scope.folhaprocesso.nomepeca = '';
    $state.go('folhaprocessos');
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.mostrarImagem = function (ev) {
    showImage(ev);
  }

  function showImage(ev) {
    //var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'DialogImageController',
      templateUrl: 'folhaprocesso/_imageFolhaprocesso.html',
      parent: angular.element(document.body),
      locals: {
        desenho: $scope.folhaprocesso.desenho
      },
      targetEvent: ev,
      onRemoving: onCloseDialog,
      clickOutsideToClose:true
      //fullscreen: useFullScreen
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

    function onCloseDialog(scope, element, options) {
      desenhos.get($scope.folhaprocesso.desenho.id).then(function(desenho){
        $scope.folhaprocesso.desenho = desenho;
      });
    }
  };
  

}])
.controller('DialogImageController', ['$scope',
                                      '$mdDialog',
                                      '$mdToast',
                                      'Upload',
                                      'desenhos',
                                      'desenho',
function ($scope, $mdDialog, $mdToast, Upload, desenhos, desenho) {
    $scope.desenho = desenho;
    
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    
    $scope.upload = function (file) {
      Upload.upload({
        url: 'desenhos/' + $scope.desenho.id + '.json',
        method: 'PUT',
        headers: { 'Content-Type': false },
        fields: {
          'desenho[titulo]': $scope.desenho.titulo,
          'desenho[picture]': file
        },
        file: file,
        sendFieldsAs: 'json'
      }).then(function (resp) {
        console.log('Success ' + resp.config.file.name + 'uploaded. Response: ' + resp.data);
        desenhos.get($scope.desenho.id).then(function(desenho){
          $scope.desenho = desenho;
          $scope.desenho.modelo = desenho.modelo.id;
          $scope.desenho.grupomodelo = desenho.grupomodelo.id;
        });
      }, function (resp) {
        console.log('Error status: ' + resp.status);
        desenhos.get($scope.desenho.id).then(function(desenho){
          $scope.desenho = desenho;
          $scope.desenho.modelo = desenho.modelo.id;
          $scope.desenho.grupomodelo = desenho.grupomodelo.id;
        });
      }, function (evt) {
        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

        console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
      });
    };
}]);