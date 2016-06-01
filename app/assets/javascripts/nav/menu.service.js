
  angular.module('common.services')
    .factory('menu', [
      '$location',
      function ($location) {
        var sections = [{
          name: 'Inicio',
          state: 'home',
          type: 'link',
          icon: 'store'
        }];

        sections.push({
          name: 'Pessoas',
          type: 'toggle',
          pages: [
          {
            name: 'Fabricante',
            state: 'fabricantes',
            type: 'link',
            icon: 'business'
          }, 
          {
            name: 'Programador',
            state: 'programadors',
            type: 'link',
            icon: 'dvr'
          }]
        });

        sections.push({
          name: 'Desenho',
          type: 'toggle',
          pages: [
          {
            name: 'Desenho',
            state: 'desenhos',
            type: 'link',
            icon: 'photo'
          },
          {
            name: 'Grupo de Máquina',
            state: 'grupomodelos',
            type: 'link',
            icon: 'folder'
          },
          {
            name: 'Máquina',
            state: 'modelos',
            type: 'link',
            icon: 'phonelink'
          }]
        });

        sections.push({
          name: 'Ferramentas',
          type: 'toggle',
          pages: [
          {
            name: 'Operação',
            type: 'link',
            state: 'operacaos',
            icon: 'settings_applications'
          }, 
          {
            name: 'Inserto',
            state: 'insertos',
            type: 'link',
            icon: 'dashboard'
          },
          {
            name: 'Ferramenta',
            state: 'suportes',
            type: 'link',
            icon: 'build'
          },
          {
            name: 'Acessório',
            state: 'acessorios',
            type: 'link',
            icon: 'equalizer'
          },
          {
            name: 'Comando',
            state: 'comandos',
            type: 'link',
            icon: 'games'
          }]
        });

        sections.push({
          name: 'Movimentos',
          type: 'toggle',
          pages: [{
            name: 'Emitir Folha Processo',
            type: 'link',
            state: 'folhaprocessos',
            icon: 'content_paste'
          }]
        });

        sections.push({
          name: 'Usuários',
          type: 'toggle',
          pages: [{
            name: 'Novo Usuário',
            type: 'link',
            state: 'register',
            icon: 'person'
          }, {
            name: 'Usuários',
            type: 'link',
            state: 'users',
            icon: 'group'
          }, {
            name: 'Alterar Empresa',
            type: 'link',
            state: 'updateEmpresa',
            icon: 'business'
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