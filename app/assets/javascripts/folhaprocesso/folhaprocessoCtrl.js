angular.module('StarterApp.controllers')

.controller('FolhaprocessoCtrl', ['$scope',
      														'$state',
      														'$mdMedia',
      														'$mdDialog',
      														'$mdSidenav',
      		                        'folhaprocessos',  
function($scope, $state, $mdMedia, $mdDialog, $mdSidenav, folhaprocessos){
	$scope.folhaprocessos = folhaprocessos.folhaprocessos;
  
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];

  $scope.query = {
    order: 'nomepeca',
    limit: 2,
    page: 1
  };

  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };

  $scope.logItem = function (item) {
    console.log(item.name, 'was selected');
  };
  
  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };
  
  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  }

  function success(folhaprocessos) {
    $scope.folhaprocessos = $scope.folhaprocessos;
  }

  function getFolhaprocesso(query) {
    console.log(query);
    $scope.promise = folhaprocessos.getTable(query, success).$promise;
  }

	$scope.newFolhaprocesso = function() {
    $state.go('folhaprocesso');
  };

  $scope.showFolhaprocesso = function(id) {
    $state.go('showFolhaprocesso', { "id": id});
  };

  $scope.editar = function(id) {
    $state.go('updateFolhaprocesso', { "id": id});
  };

  $scope.imprimir = function () {
    if ($scope.selected.length > 1) {
      $scope.error = "Para impressão deve ser selecionado apenas um";
      return;
    }
    folhaprocessos.get($scope.selected[0].id).then(function(folhaprocesso){
      var doc = new jsPDF('landscape', 'pt');
      var linhas = 50;
      doc.text(350, linhas, " Folha de Processo ");

      var columns = [
        {title: "logo"    , dataKey: "logo"},
        {title: "titulo"  , dataKey: "titulo"},
        {title: "dados"   , dataKey: "dados"}, 
        {title: "titulo1" , dataKey: "titulo1"},
        {title: "dados1"  , dataKey: "dados1"},
        {title: "comandos", dataKey: "comandos"},
        ]; 

      var rows = [];
      rows.push({"logo"    : "Logo", 
                 "titulo"  : "Código folha de Processo", 
                 "dados"   : folhaprocesso.id, 
                 "titulo1" : "Código desenho",
                 "dados1"  : folhaprocesso.desenho.codigo, 
                 "comandos": "Comandos programados", 
               });

      rows.push({"logo"    : "Logo", 
                 "titulo"  : "Operação", 
                 "dados"   : folhaprocesso.operacao.descricao, 
                 "titulo1" : "Título do desenho",
                 "dados1"  : folhaprocesso.desenho.titulo, 
                 "comandos": "comandos", 
               });

      rows.push({"logo"    : "Logo", 
                 "titulo"  : "Tempo estimado", 
                 "dados"   : folhaprocesso.tempo, 
                 "titulo1" : "Grupo",
                 "dados1"  : folhaprocesso.desenho.grupomodelo.descricao, 
                 "comandos": "comandos", 
               });

      rows.push({"logo"    : "Logo", 
                 "titulo"  : "Programador", 
                 "dados"   : folhaprocesso.programador.nome, 
                 "titulo1" : "Máquina",
                 "dados1"  : folhaprocesso.desenho.modelo.descricao, 
                 "comandos": "comandos", 
               });
      var comandos = "";
      for (var i = 0; i < folhaprocesso.comandofolhas.length; i++) {
        comandos += folhaprocesso.comandofolhas[i].comando.descricao;
        if ((i+1) % 2 === 0) {
          comandos += "\n";
        } else {
          comandos += "\t";
        }
      }
      
      doc.autoTable(columns, rows, {
        margin: {top: 60},
        theme: 'grid',
        fontSize: 6,
        lineColor: 0,
        drawHeaderRow: function() {
            // Don't draw header row
            return false;
        },
        columnStyles: {
            titulo: {fillColor: [217, 217, 217], textColor: 0, fontStyle: 'bold'},
            titulo1: {fillColor: [217, 217, 217], textColor: 0, fontStyle: 'bold'}
        },
        drawCell: function (cell, data) {
            // Rowspan
            if (data.column.dataKey === 'logo') {
                if (data.row.index % 4 === 0) {
                    doc.rect(cell.x, cell.y, data.table.width, cell.height * 4, 'S');
                    doc.autoTableText('Logo', cell.x + cell.width / 2, cell.y + cell.height * 4 / 2, {
                        halign: 'center',
                        valign: 'middle'
                    });
                }
                return false;
            }

            if (data.column.dataKey === 'comandos') {
                if (data.row.index === 0) {
                    doc.rect(cell.x, cell.y, cell.width, cell.height * 1, 'S');
                    doc.autoTableText('Comandos programados', cell.x + cell.width / 2, cell.y + cell.height * 1 / 2, {
                        halign: 'center',
                        valign: 'middle',
                    });
                    //data.row.styles.fillColor = [217, 217, 217];
                }

                if (data.row.index % 4 === 0) {
                    doc.rect(cell.x, cell.y + cell.height, cell.width, cell.height * 3, 'S');
                    doc.autoTableText(comandos, cell.x + cell.width / 2, cell.y + cell.height * 4 / 2, {
                        halign: 'center',
                        valign: 'bottom'
                    });
                }
                return false;
            }
        },
      });

      columns = [];
      columns = [
        {title: "desenho" , dataKey: "desenho"},
        {title: "Descrição do Material"  , dataKey: "material"},
        {title: "Instrumento de medição, fixação e outros"   , dataKey: "acessorios"}, 
        ]; 
      var acessorios = "";
      for (var i = 0; i < folhaprocesso.acessoriofolhas.length; i++) {
        acessorios += folhaprocesso.acessoriofolhas[i].acessorio.descricao + "\n";
      }
      rows = [];
      rows.push({"desenho"   : "Desenho", 
                 "material"  : "Descrição do Material", 
                 "acessorios": "Instrumento de medição, fixação e outros"
               });
      rows.push({"desenho"   : "Desenho", 
                 "material"  : folhaprocesso.nomepeca, 
                 "acessorios": acessorios
               });


      doc.autoTable(columns, rows, {
        margin: {top: 140},
        theme: 'grid',
        fontSize: 6,
        lineColor: 0,
        drawHeaderRow: function() {
            // Don't draw header row
            return false;
        },
        
        drawRow: function (row, data) {
          if (row.index == 1) {
            row.height = 90;
            row.heightStyle = 90;
          }
        },
        drawCell: function (cell, data) {
            // Rowspan
            if (data.column.dataKey === 'desenho') {
                if (data.row.index % 2 === 0) {
                    doc.rect(cell.x, cell.y, data.table.width, data.table.height-cell.height+54, 'S');
                    doc.autoTableText('Desenho', cell.x + cell.width / 2, cell.y + cell.height * 2 / 2, {
                        halign: 'center',
                        valign: 'middle'
                    });
                }
                return false;
            }
        }
      });

      columns = [];
      columns = [{title: "FERRAMENTAL", dataKey: "ferramental"}]; 

      rows = [];
      doc.autoTable(columns, rows, {
        theme: 'grid',
        fontSize: 8,
        margin: {top: 280},

        //bodyStyles: {rowHeight: 30},
        createdHeaderCell: function (cell, data) {
      
          cell.styles.fillColor = [217, 217, 217];
          cell.styles.fontSize = 8;
          cell.styles.textColor = 0;
          cell.styles.halign = 'center';

        }
      });
      columns = [];
      columns = [
        {title: "Posição da Ferramenta", dataKey: "posicao"},
        {title: "Descrição da Ferramenta", dataKey: "suporte"},
        {title: "Descrição do Inserto", dataKey: "inserto"}, 
        {title: "Altura", dataKey: "altura"},
        {title: "Posição da Ferramenta", dataKey: "posicao1"},
        {title: "Descrição da Ferramenta", dataKey: "suporte1"},
        {title: "Descrição do Inserto", dataKey: "inserto1"}, 
        {title: "Altura", dataKey: "altura1"}]; 

      rows = [];
      for (var i = 0; i < 10; i++) { 
        if (typeof folhaprocesso.ferramentafolhas[i] !== "undefined" && typeof folhaprocesso.ferramentafolhas[i+10] !== "undefined") {
          rows.push({"posicao": folhaprocesso.ferramentafolhas[i].posicao, 
                     "suporte": folhaprocesso.ferramentafolhas[i].suporte.descricao, 
                     "inserto": folhaprocesso.ferramentafolhas[i].inserto.descricao, 
                     "altura": folhaprocesso.ferramentafolhas[i].altura,
                     "posicao1": folhaprocesso.ferramentafolhas[i+10].posicao, 
                     "suporte1": folhaprocesso.ferramentafolhas[i+10].suporte.descricao, 
                     "inserto1": folhaprocesso.ferramentafolhas[i+10].inserto.descricao, 
                     "altura1": folhaprocesso.ferramentafolhas[i+10].altura
                   });
        } else if (typeof folhaprocesso.ferramentafolhas[i] !== "undefined" && typeof folhaprocesso.ferramentafolhas[i+10] == "undefined") {
          rows.push({"posicao": folhaprocesso.ferramentafolhas[i].posicao, 
                     "suporte": folhaprocesso.ferramentafolhas[i].suporte.descricao, 
                     "inserto": folhaprocesso.ferramentafolhas[i].inserto.descricao, 
                     "altura": folhaprocesso.ferramentafolhas[i].altura,
                     "posicao1": " ", 
                     "suporte1": " ", 
                     "inserto1": " ", 
                     "altura1": " "
                   });
        } else if (typeof folhaprocesso.ferramentafolhas[i] == "undefined" && typeof folhaprocesso.ferramentafolhas[i+10] !== "undefined") {
          rows.push({"posicao": " ", 
                     "suporte": " ", 
                     "inserto": " ", 
                     "altura": " ",
                     "posicao1": folhaprocesso.ferramentafolhas[i+10].posicao, 
                     "suporte1": folhaprocesso.ferramentafolhas[i+10].suporte.descricao, 
                     "inserto1": folhaprocesso.ferramentafolhas[i+10].inserto.descricao, 
                     "altura1": folhaprocesso.ferramentafolhas[i+10].altura
                   });
        } else {
          rows.push({"posicao": "", 
                     "suporte": "", 
                     "inserto": "", 
                     "altura": "",
                     "posicao1": "", 
                     "suporte1": "", 
                     "inserto1": "", 
                     "altura1": ""
                   });
        }
      };
      doc.autoTable(columns, rows, {
        theme: 'grid',
        fontSize: 8,
        margin: {top: 300},

        //bodyStyles: {rowHeight: 30},
        createdHeaderCell: function (cell, data) {
      
          cell.styles.fillColor = [217, 217, 217];
          cell.styles.fontSize = 8;
          cell.styles.textColor = 0;

        }
      });

      //doc.save('FolhaProcesso' + folhaprocesso.id + '.pdf');
      doc.output('dataurlnewwindow');
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
