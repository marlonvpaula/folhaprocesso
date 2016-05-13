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

  o.update = function(id, user) {
    return $http.put('/users/' + id + '.json', user).success(function(data){
      for(var i = o.users.length - 1; i >= 0; i--) {
        if(o.users[i].id === id) {
          o.users[i] = user;
        }
      }
    });
  };

  return o;
}]);