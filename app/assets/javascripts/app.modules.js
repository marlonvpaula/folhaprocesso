
  angular.module('common.services', []);
  angular.module('common.factory', []);
  angular.module('StarterApp.controllers', ['common.directives', 'common.factory']);
  angular.module('common.directives', ['common.services']);

