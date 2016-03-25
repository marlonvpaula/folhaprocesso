
  angular.module('common.services')
    .factory('menu', [
      '$location',
      function ($location) {

        var sections = [{
          name: 'Inicio',
          state: 'home',
          type: 'link'
        }];

        sections.push({
          name: 'Cadastros',
          type: 'toggle',
          pages: [/*{
            name: 'Ferramenta',
            type: 'link',
            state: 'beers.ipas',
            icon: 'fa fa-cog'
          },*/{
            name: 'Operação',
            type: 'link',
            state: 'operacaos',
            icon: 'fa fa-cog'
          }, 
          {
            name: 'Fabricante',
            state: 'fabricantes',
            type: 'link',
            icon: 'fa fa-building-o'
          }, 
          {
            name: 'Programador',
            state: 'programadors',
            type: 'link',
            icon: 'fa fa-child'
          },
          {
            name: 'Inserto',
            state: 'insertos',
            type: 'link',
            icon: 'fa fa-object-group'
          },
          {
            name: 'Ferramenta',
            state: 'suportes',
            type: 'link',
            icon: 'fa fa-wrench'
          },
          {
            name: 'Desenho',
            state: 'desenhos',
            type: 'link',
            icon: 'fa fa-picture-o'
          },
          {
            name: 'Maquina',
            state: 'modelos',
            type: 'link',
            icon: 'fa fa-hdd-o'
          },
          {
            name: 'Grupo de Maquina',
            state: 'grupomodelos',
            type: 'link',
            icon: 'fa fa-folder-o'
          },
          {
            name: 'Acessório',
            state: 'acessorios',
            type: 'link',
            icon: 'fa fa-link'
          },
          {
            name: 'Comando',
            state: 'comandos',
            type: 'link',
            icon: 'fa fa-cogs'
          }]
        });

        sections.push({
          name: 'Movimentos',
          type: 'toggle',
          pages: [{
            name: 'Emitir Folha Processo',
            type: 'link',
            state: 'folhaprocessos',
            icon: 'fa fa-clipboard'
          }]
        });

        sections.push({
          name: 'Usuários',
          type: 'toggle',
          pages: [{
            name: 'Novo Usuário',
            type: 'link',
            state: 'register',
            icon: 'fa fa-user'
          }, {
            name: 'Usuários',
            type: 'link',
            state: 'users',
            icon: 'fa fa-group'
          }]
        });


        var self;

        return self = {
          sections: sections,

          toggleSelectSection: function (section) {
            self.openedSection = (self.openedSection === section ? null : section);
          },
          isSectionSelected: function (section) {
            return self.openedSection === section;
          },

          selectPage: function (section, page) {
            page && page.url && $location.path(page.url);
            self.currentSection = section;
            self.currentPage = page;
          }
        };
      }]);