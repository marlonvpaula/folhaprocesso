angular.module('common.factory')
.factory('users', ['$http', function($http){
	var o = {
    users: []
  };


  o.getAll = function() {
  	return $http.get('/users.json').success(function(data){
      angular.copy(data, o.users);
    });
  };


  o.get = function(id) {
    return $http.get('/users/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  return o;
}]);