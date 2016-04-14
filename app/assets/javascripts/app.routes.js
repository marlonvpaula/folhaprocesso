angular.module('StarterApp', ['md.data.table', 
                               'ngMaterial', 
                               'ui.router', 
                               'ui.mask',
                               'ngCookies',
                               //'angularFileUpload',
                               'ngFileUpload',
                               'templates',
                               'Devise',
                               'StarterApp.controllers'
                               ])
.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if (!Auth.isAuthenticated) {
          $location.path('/login');
          return;
        }
    });
}])
.config(['$httpProvider', function ($httpProvider) {
  //$httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  $httpProvider.interceptors.push('authInterceptor');
}])
.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
  return {
    // Add authorization token to headers
    request: function (config) {
      config.headers = config.headers || {};
      if ($cookieStore.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      if(response.status === 401) {
        $location.path('/login');
        // remove any stale tokens
        $cookieStore.remove('token');
        return $q.reject(response);
      }
      else {
        return $q.reject(response);
      }
    }
  };
})


.config(['$stateProvider', '$urlRouterProvider', '$logProvider', 
  function ($stateProvider, $urlRouterProvider) {
    

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'HomeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/_login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home');
          })
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl'/*,
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home');
          })
        }]*/
      })
      .state('users', {
        url: '/users',
        templateUrl: 'user/_users.html',
        controller: 'UserCtrl',
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
        resolve: {
          desenho: ['$stateParams', 'desenhos', function($stateParams, desenhos) {
            return desenhos.get($stateParams.id);
          }]
        }
      })
      .state('updateDesenho', {
        url: '/desenhos/update/{id}',
        templateUrl: 'desenho/_newDesenhos.html',
        controller: 'DesenhoUpdateCtrl',
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
    $urlRouterProvider.otherwise("/login");
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
