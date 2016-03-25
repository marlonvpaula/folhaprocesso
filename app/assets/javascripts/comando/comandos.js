angular.module('common.factory')
.factory('comandos', [
'$http',
function($http){
  var o = {
    comandos: []
  };


  o.getAll = function() {
  	return $http.get('/comandos.json').success(function(data){
      angular.copy(data, o.comandos);
    });
  };

  o.get = function(id) {
    return $http.get('/comandos/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.create = function(comando) {
	  return $http.post('/comandos.json', comando).success(function(data){
	    o.comandos.push(data);
	  });
	};

  o.update = function(id, comando) {
    return $http.put('/comandos/' + id + '.json', comando).success(function(data){
      for(var i = o.comandos.length - 1; i >= 0; i--) {
        if(o.comandos[i].id === id) {
          o.comandos[i] = comando;
        }
      }
    });
  };

  o.remove = function(id) {
    return $http.delete('/comandos/' + id + '.json').success(function(data){
      for(var i = o.comandos.length - 1; i >= 0; i--) {
        if(o.comandos[i].id === id) {
          o.comandos.splice(i, 1);
        }
      }
    });
  };

  return o;
}]);