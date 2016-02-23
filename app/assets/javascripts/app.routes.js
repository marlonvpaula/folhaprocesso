
 angular.module('StarterApp', ['md.data.table', 
                               'ngMaterial', 
                               'ui.router', 
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
