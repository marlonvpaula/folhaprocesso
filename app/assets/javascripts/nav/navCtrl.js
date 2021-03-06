
  angular.module('StarterApp.controllers')

.controller('NavCtrl', ['$scope', 
                        '$rootScope',
                        '$mdSidenav', 
                        'menu', 
                        '$state', 
                        'Auth', 
function($scope, $rootScope, $mdSidenav, menu, $state, Auth){

	var vm = this;
  vm.isOpen = isOpen;
  vm.toggleOpen = toggleOpen;
  vm.isSectionSelected = isSectionSelected;
  vm.autoFocusContent = false;
  vm.menu = menu;

  //$scope.ngShow = showMenu.getProperty();
  $rootScope.ngShow = true;

  $scope.signedIn = Auth.isAuthenticated;

  $scope.logout = function () {
    Auth.logout();
  };

  $scope.home = function () {
    $state.go('home');
  };

  $scope.updateUser = function () {
    $state.go('updateUsuario');
  }

  this.openMenu = function($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };
    
  Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
    $state.go('homePage');
  });

  function isOpen(section) {
    return menu.isSectionSelected(section);
  }

  function toggleOpen(section) {
    menu.toggleSelectSection(section);
  }

  function isSectionSelected(section) {
    var selected = false;
    var openedSection = menu.openedSection;
    if(openedSection === section){
      selected = true;
    }
    else if(section.children) {
      section.children.forEach(function(childSection) {
        if(childSection === openedSection){
          selected = true;
        }
      });
    }
    return selected;
  }

}]);