angular.module('StarterApp.controllers')

.controller('HomePageCtrl', ['$scope', 
                             '$state',  
                             '$mdMedia',
                             '$mdDialog',
                             '$mdToast', 
                             '$mdSidenav', 
function($scope, 
         $state, 
         $mdMedia,
         $mdDialog,
         $mdToast, 
         $mdSidenav){

  //$rootScope.ngShow = false;

  
  $scope.login = function (ev) {
    showAdvancedLogin(ev);
  }

  $scope.cadastre = function (ev) {
    //$state.go('login');
    showAdvancedEmpresa(ev);
  }
  
  $scope.openToast = function($event) {
    $mdToast.show($mdToast.simple().content('Hello!'));
    //$mdToast.showSimple('Hello');
    // Could also do $mdToast.showSimple('Hello');
  };

  
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  function showAdvancedLogin(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'AuthCtrl',
      templateUrl: 'auth/_login.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
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
  };

  function showAdvancedEmpresa(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'AuthCtrl',
      templateUrl: 'auth/_empresa.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
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
  };
  

}]);
