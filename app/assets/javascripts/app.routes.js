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

    /*$rootScope.$on("$stateChangeStart", function(event, next) {
      var authenticator, permissions, user;
      permissions = next && next.data ? next.data.permissions : null;
      user = Session.getCurrentUser();
      authenticator = new Authorizer(user);
      if ((permissions != null) && !authenticator.canAccess(permissions)) {
        event.preventDefault();
        if (!user) {
          return $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        } else {
          return $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        }
      }
    });*/
}])
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.User;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.User;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
            }
          });
        }]
      })
      .state('users', {
        url: '/users',
        templateUrl: 'user/_users.html',
        controller: 'UserCtrl',
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.User;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.User;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Operacao;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Fabricante;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Programador;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Acessorio;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Comando;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Inserto;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Inserto;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Inserto;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Inserto;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Suporte;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Suporte;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Suporte;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Suporte;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.GrupoModelo;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Modelo;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Modelo;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Modelo;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Modelo;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Desenho;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Desenho;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Desenho;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.Desenho;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.FolhaProcesso;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.FolhaProcesso;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.FolhaProcesso;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.FolhaProcesso;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
        onEnter: ['$state', '$mdToast', 'Auth', 'APP_PERMISSIONS', 'Authorizer', 
          function($state, $mdToast, Auth, APP_PERMISSIONS, Authorizer) {
          Auth.currentUser().then(function (user){
            if (!user) {
              $state.go('homePage');  
            }
            var authenticator, permissions;
            permissions = APP_PERMISSIONS.FolhaProcesso;
            authenticator = new Authorizer(user);
            if (!authenticator.canAccess(permissions)) {
              $state.go('homePage');  
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Sem Autorização!')
                  .position("top right")
                  .hideDelay(3000)
              );
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
.constant('USER_ROLES', {
  admin: "admin",
  superadmin: "superadmin",
  normal: "normal",
})
.constant('APP_PERMISSIONS', {
  Acessorio: "Acessorio",
  Comando: "Comando",
  Desenho: "Desenho",
  Empresa: "Empresa",
  Fabricante: "Fabricante",
  FolhaProcesso: "FolhaProcesso",
  GrupoModelo: "GrupoModelo",
  Inserto: "Inserto",
  Modelo: "Modelo",
  Operacao: "Operacao",
  Programador: "Programador",
  Suporte: "Suporte",
  User: "User",
})
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
