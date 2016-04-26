var app = angular.module('common.directives');

app
    .run(['$templateCache', function ($templateCache) {
      //ng-class="{\'{{section.icon}}\' : true}"
      $templateCache.put('partials/menu-link.tmpl.html',
        '<md-button class="md-button-toggle side-menu"  \n' +
        ' ui-sref-active="active" ui-sref="{{section.state}}" ng-click="focusSection()"> \n' +
        ' <md-icon class="material-icons">{{section.icon}}</md-icon> \n' +
        '  {{section | humanizeDoc}}\n' +
        '  <span  class="md-visually-hidden "\n' +
        '    ng-if="isSelected()">\n' +
        '    current page\n' +
        '  </span>\n' +
        '</md-button>\n' +
        '');
    }])
    .directive('menuLink', function () {
      return {
        scope: {
          section: '='
        },
        templateUrl: 'partials/menu-link.tmpl.html',
        link: function ($scope, $element) {
          var controller = $element.parent().controller();

          $scope.focusSection = function () {
            // set flag to be used later when
            // $locationChangeSuccess calls openPage()
            controller.autoFocusContent = true;
          };
        }
      };
    });