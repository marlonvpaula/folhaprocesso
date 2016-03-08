angular.module('StarterApp.controllers')

.controller('FolhaprocessoCtrl', ['$scope',
      														'$state',
      														'$mdMedia',
      														'$mdDialog',
      														'$mdSidenav',
      		                        'folhaprocessos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, folhaprocessos){
	$scope.folhaprocessos = folhaprocessos.folhaprocessos;


	$scope.newFolhaprocesso = function() {
    $state.go('folhaprocesso');
  };

  $scope.showFolhaprocesso = function(id) {
    $state.go('showFolhaprocesso', { "id": id});
  };

  $scope.editarFolhaprocesso = function(id) {
    $state.go('updateFolhaprocesso', { "id": id});
  };

  $scope.imprimir = function () {
    if ($scope.selected.length > 1) {
      $scope.error = "Para impressão deve ser selecionado apenas um";
      return;
    }
    folhaprocessos.get($scope.selected[0].id).then(function(folhaprocesso){
      var doc = new jsPDF();
      var linhas = 10;
      doc.text(80, linhas, " Folha de Processo ");
      doc.setFontSize(10);
      linhas += 20;
      doc.text(10, linhas, " Nome da Peça: " + folhaprocesso.nomepeca);
      linhas += 10;
      doc.text(10, linhas, " Desenho: " + folhaprocesso.nrDesenho + "    Data Projeto: " + folhaprocesso.dtProjeto);
      linhas += 10;
      doc.text(10, linhas, " Maquina: " + folhaprocesso.modelo.descricao + "    Grupo Modelo: " + folhaprocesso.grupomodelo.descricao);
      
      linhas += 20;
      doc.text(010, linhas, "Suporte");
      doc.text(050, linhas, "Inserto");
      doc.text(090, linhas, "Fabricante");
      doc.text(130, linhas, "Raio");
      linhas += 10;
      folhaprocesso.ferramentafolhas.forEach(function(ferramentafolha, i){
          doc.text(010, linhas + (i * 10), ferramentafolha.suporte.descricao);
          doc.text(050, linhas + (i * 10), ferramentafolha.inserto.descricao);
          doc.text(090, linhas + (i * 10), ferramentafolha.fabricante.descricao);
          doc.text(130, linhas + (i * 10), ferramentafolha.raio.valor);
      });
      doc.save('FolhaProcesso' + folhaprocesso.id + '.pdf');
    });
  }

  $scope.remover = function() {
  	for (var i = 0; i < $scope.selected.length; i++) {
  		folhaprocessos.remove(
		    $scope.selected[i].id
		  );
  	}
    $scope.selected = [];
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
}]);
