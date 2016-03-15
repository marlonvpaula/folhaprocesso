angular.module('common.factory')
.factory('raios', [
'$http',
function($http){
  var o = {
    raios: []
  };


  o.getAll = function() {
  	return $http.get('/raios.json').success(function(data){
      angular.copy(data, o.raios);
    });
  };

  o.get = function(id) {
    return $http.get('/raios/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.create = function(raio) {
	  return $http.post('/raios.json', raio).success(function(data){
	    o.raios.push(data);
	  });
	};

  o.update = function(id, raio) {
    return $http.put('/raios/' + id + '.json', raio).success(function(data){
      for(var i = o.raios.length - 1; i >= 0; i--) {
        if(o.raios[i].id === id) {
          o.raios[i] = raio;
        }
      }
    });
  };

  o.remove = function(id) {
    return $http.delete('/raios/' + id + '.json').success(function(data){
      for(var i = o.raios.length - 1; i >= 0; i--) {
        if(o.raios[i].id === id) {
          o.raios.splice(i, 1);
        }
      }
    });
  };

  return o;
}]);