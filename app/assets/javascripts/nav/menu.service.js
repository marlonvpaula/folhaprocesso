
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
          pages: [{
            name: 'Ferramenta',
            type: 'link',
            state: 'beers.ipas',
            icon: 'fa fa-cog'
          },{
            name: 'Operação',
            type: 'link',
            state: 'operacaos',
            icon: 'fa fa-group'
          }, {
            name: 'Fabricante',
            state: 'fabricantes',
            type: 'link',
            icon: 'fa fa-building-o'
          },
            {
              name: 'Inserto',
              state: 'insertos',
              type: 'link',
              icon: 'fa fa-cogs'
            },
            {
              name: 'Suporte',
              state: 'home.createTool',
              type: 'link',
              icon: 'fa fa-user'
            },
            {
              name: 'Raio',
              state: 'home.createTool',
              type: 'link',
              icon: 'fa fa-circle-o'
            },
            {
              name: 'Grupo Modelo',
              state: 'home.createTool',
              type: 'link',
              icon: 'fa fa-folder-o'
            },
            {
              name: 'Modelo',
              state: 'home.createTool',
              type: 'link',
              icon: 'fa fa-hdd-o'
            },
            {
              name: 'Acessório',
              state: 'home.createTool',
              type: 'link',
              icon: 'fa fa-link'
            }]
        });

        sections.push({
          name: 'Movimentos',
          type: 'toggle',
          pages: [{
            name: 'Emitir Folha Processo',
            type: 'link',
            state: 'home.findwood',
            icon: 'fa fa-clipboard'
          }, {
            name: 'Visualizar Folha Processo',
            state: 'home.woodlist',
            type: 'link',
            icon: 'fa fa-files-o'
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