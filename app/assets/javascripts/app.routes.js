angular.module('StarterApp', ['md.data.table', 
                               'ngMaterial', 
                               'ui.router', 
                               'ui.mask',
                               'ngCookies',
                               'ngFileUpload',
                               'templates',
                               'Devise',
                               'common.services',
                               'StarterApp.controllers'
                               ])
.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {
        if (!Auth.isAuthenticated()) {
          $location.path('/');
          return;
        }
    });
}])

/*.run(function ($rootScope, $state, Auth) {
  $rootScope.$on("$stateChangeStart", function(event, toState, Auth){
    if (!Auth.isAuthenticated()) {
      $location.path('/');
      return;
    }
  });
})*/
.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$logProvider', 
  function ($httpProvider, $stateProvider, $urlRouterProvider) {
    //$httpProvider.interceptors.push('authInterceptor');

    $stateProvider
      .state('homePage', {
        url: '/',
        templateUrl: 'homePage/_homePage.html',
        controller: 'HomePageCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home');
          })
        }]
      })
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'HomeCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }]
      })
      .state('updateEmpresa', {
        url: '/updateEmpresa',
        templateUrl: 'auth/_UpdateEmpresa.html',
        controller: 'EmpresaUpdateCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }]
      })
      .state('updateUsuario', {
        url: '/updateUsuario',
        templateUrl: 'auth/_UpdateUsuario.html',
        controller: 'UsuarioUpdateCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }]
      })
      .state('users', {
        url: '/users',
        templateUrl: 'user/_users.html',
        controller: 'UserCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['users', function(users){
            return users.getAll();
          }]
        }
      })
      .state('user', {
        url: '/users/{id}',
        templateUrl: 'user/_userPerm.html',
        controller: 'UserPermCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          user: ['$stateParams', 'users', function($stateParams, users) {
            return users.get($stateParams.id);
          }]
        }
      })
      .state('operacaos', {
        url: '/operacaos',
        templateUrl: 'operacao/_operacaos.html',
        controller: 'OperacaoCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['operacaos', function(operacaos){
            return operacaos.getAll();
          }]
        }
      })
      .state('fabricantes', {
        url: '/fabricantes',
        templateUrl: 'fabricante/_fabricantes.html',
        controller: 'FabricanteCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['fabricantes', function(fabricantes){
            return fabricantes.getAll();
          }]
        }
      })
      .state('programadors', {
        url: '/programadors',
        templateUrl: 'programador/_programadors.html',
        controller: 'ProgramadorCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['programadors', function(programadors){
            return programadors.getAll();
          }]
        }
      })
      .state('acessorios', {
        url: '/acessorios',
        templateUrl: 'cessorio/_acessorios.html',
        controller: 'AcessorioCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['acessorios', function(acessorios){
            return acessorios.getAll();
          }]
        }
      })
      .state('comandos', {
        url: '/comandos',
        templateUrl: 'comando/_comandos.html',
        controller: 'ComandoCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['comandos', function(comandos){
            return comandos.getAll();
          }]
        }
      })
      .state('insertos', {
        url: '/insertos',
        templateUrl: 'inserto/_insertos.html',
        controller: 'InsertoCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['insertos', function(insertos){
            return insertos.getAll();
          }]
        }
      })
      .state('inserto', {
        url: '/insertos/new',
        templateUrl: 'inserto/_newInsertos.html',
        controller: 'InsertoNewCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['fabricantes', function(fabricantes){
            return fabricantes.getAll();
          }]
        }
      })
      .state('showInserto', {
        url: '/insertos/{id}',
        templateUrl: 'inserto/_showInsertos.html',
        controller: 'InsertoShowCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          inserto: ['$stateParams', 'insertos', function($stateParams, insertos) {
            return insertos.get($stateParams.id);
          }]
        }
      })
      .state('updateInserto', {
        url: '/insertos/update/{id}',
        templateUrl: 'inserto/_newInsertos.html',
        controller: 'InsertoUpdateCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['fabricantes', function (fabricantes) {
            return fabricantes.getAll();
          }]
        }
      })
      .state('suportes', {
        url: '/suportes',
        templateUrl: 'suporte/_suportes.html',
        controller: 'SuporteCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['suportes', function(suportes){
            return suportes.getAll();
          }]
        }
      })
      .state('suporte', {
        url: '/suportes/new',
        templateUrl: 'suporte/_newSuportes.html',
        controller: 'SuporteNewCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          initialData: ['insertos', 'operacaos','$q', function (insertos, operacaos, $q) {
            return $q.all({
               insertos: insertos.getAll(),
               operacaos: operacaos.getAll(),
             });
          }]
        }
      })
      .state('showSuporte', {
        url: '/suportes/{id}',
        templateUrl: 'suporte/_showSuportes.html',
        controller: 'SuporteShowCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          suporte: ['$stateParams', 'suportes', function($stateParams, suportes) {
            return suportes.get($stateParams.id);
          }]
        }
      })
      .state('updateSuporte', {
        url: '/suportes/update/{id}',
        templateUrl: 'suporte/_newSuportes.html',
        controller: 'SuporteUpdateCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          initialData: ['insertos', 'operacaos','$q', function (insertos, operacaos, $q) {
            return $q.all({
               insertos: insertos.getAll(),
               operacaos: operacaos.getAll(),
             });
          }]
        }
      })
      .state('grupomodelos', {
        url: '/grupomodelos',
        templateUrl: 'grupomodelo/_grupomodelos.html',
        controller: 'GrupomodeloCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['grupomodelos', function(grupomodelos){
            return grupomodelos.getAll();
          }]
        }
      })
      .state('modelos', {
        url: '/modelos',
        templateUrl: 'modelo/_modelos.html',
        controller: 'ModeloCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['modelos', function(modelos){
            return modelos.getAll();
          }]
        }
      })
      .state('modelo', {
        url: '/modelos/new',
        templateUrl: 'modelo/_newModelos.html',
        controller: 'ModeloNewCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['grupomodelos', function(grupomodelos){
            return grupomodelos.getAll();
          }]
        }
      })
      .state('showModelo', {
        url: '/modelos/{id}',
        templateUrl: 'modelo/_showModelos.html',
        controller: 'ModeloShowCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          modelo: ['$stateParams', 'modelos', function($stateParams, modelos) {
            return modelos.get($stateParams.id);
          }]
        }
      })
      .state('updateModelo', {
        url: '/modelos/update/{id}',
        templateUrl: 'modelo/_newModelos.html',
        controller: 'ModeloUpdateCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['grupomodelos', function(grupomodelos){
            return grupomodelos.getAll();
          }]
        }
      })
      .state('desenhos', {
        url: '/desenhos',
        templateUrl: 'desenho/_desenhos.html',
        controller: 'DesenhoCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['desenhos', function(desenhos){
            return desenhos.getAll();
          }]
        }
      })
      .state('desenho', {
        url: '/desenhos/new',
        templateUrl: 'desenho/_newDesenhos.html',
        controller: 'DesenhoNewCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          initialData: ['grupomodelos', 
                        'modelos',
                        '$q', 
                        function (grupomodelos, modelos, $q) {
            return $q.all({
               grupomodelos: grupomodelos.getAll(),
               modelos: modelos.getAll(),
             });
          }]
        }
      })
      .state('showDesenho', {
        url: '/desenhos/{id}',
        templateUrl: 'desenho/_showDesenhos.html',
        controller: 'DesenhoShowCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          desenho: ['$stateParams', 'desenhos', function($stateParams, desenhos) {
            return desenhos.get($stateParams.id);
          }]
        }
      })
      .state('updateDesenho', {
        url: '/desenhos/update/{id}',
        templateUrl: 'desenho/_updateDesenhos.html',
        controller: 'DesenhoUpdateCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          initialData: ['grupomodelos', 
                        'modelos',
                        '$q', 
                        function (grupomodelos, modelos, $q) {
            return $q.all({
               grupomodelos: grupomodelos.getAll(),
               modelos: modelos.getAll(),
             });
          }]
        }
      })
      .state('folhaprocessos', {
        url: '/folhaprocessos',
        templateUrl: 'folhaprocesso/_folhaprocessos.html',
        controller: 'FolhaprocessoCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          postPromise: ['folhaprocessos', function(folhaprocessos){
            return folhaprocessos.getAll();
          }]
        }
      })
      .state('folhaprocesso', {
        url: '/folhaprocessos/new',
        templateUrl: 'folhaprocesso/_newFolhaprocessos.html',
        controller: 'FolhaprocessoNewCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          initialData: ['operacaos', 
                        'programadors',
                        'suportes', 
                        'acessorios',
                        'comandos',
                        '$q', 
                        function (operacaos, programadors, suportes, acessorios, comandos, $q) {
            return $q.all({
               operacaos: operacaos.getAll(),
               programadors: programadors.getAll(),
               suportes: suportes.getAll(),
               acessorios: acessorios.getAll(),
               comandos: comandos.getAll(),
             });
          }]
        }
      })
      .state('showFolhaprocesso', {
        url: '/folhaprocessos/{id}',
        templateUrl: 'folhaprocesso/_showFolhaprocessos.html',
        controller: 'FolhaprocessoShowCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          folhaprocesso: ['$stateParams', 'folhaprocessos', function($stateParams, folhaprocessos) {
            return folhaprocessos.get($stateParams.id);
          }]
        }
      })
      .state('relFolhaprocesso', {
        url: '/folhaprocessos/rel/{id}',
        templateUrl: 'folhaprocesso/_relFolhaprocessos.html',
        controller: 'FolhaprocessoRelCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          folhaprocesso: ['$stateParams', 'folhaprocessos', function($stateParams, folhaprocessos) {
            return folhaprocessos.get($stateParams.id);
          }]
        }
      })
      .state('updateFolhaprocesso', {
        url: '/folhaprocessos/update/{id}',
        templateUrl: 'folhaprocesso/_newFolhaprocessos.html',
        controller: 'FolhaprocessoUpdateCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
          });
        }],
        resolve: {
          initialData: ['operacaos', 
                        'programadors',
                        'suportes', 
                        'acessorios',
                        'comandos',
                        '$q', 
                        function (operacaos, programadors, suportes, acessorios, comandos, $q) {
            return $q.all({
               operacaos: operacaos.getAll(),
               programadors: programadors.getAll(),
               suportes: suportes.getAll(),
               acessorios: acessorios.getAll(),
               comandos: comandos.getAll(),
             });
          }]
        }
      });
      $urlRouterProvider.otherwise("/");
}])
//take all whitespace out of string
.filter('nospace', function () {
  return function (value) {
    return (!value) ? '' : value.replace(/ /g, '');
  };
})
//replace uppercase to regular case
.filter('humanizeDoc', function () {
  return function (doc) {
    if (!doc) return;
    if (doc.type === 'directive') {
      return doc.name.replace(/([A-Z])/g, function ($1) {
        return '-' + $1.toLowerCase();
      });
    }

    return doc.label || doc.name;
  };
});
