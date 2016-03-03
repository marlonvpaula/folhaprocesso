angular.module('common.factory')
.factory('modelos', [
'$http',
function($http){
  var o = {
    modelos: []
  };


  o.getAll = function() {
  	return $http.get('/modelos.json').success(function(data){
      angular.copy(data, o.modelos);
    });
  };

  o.get = function(id) {
    return $http.get('/modelos/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.create = function(modelo) {
	  return $http.post('/modelos.json', modelo).success(function(data){
	    o.modelos.push(data);
	  });
	};

  o.update = function(id, modelo) {
    return $http.put('/modelos/' + id + '.json', modelo).success(function(data){
      for(var i = o.modelos.length - 1; i >= 0; i--) {
        if(o.modelos[i].id === id) {
          o.modelos[i] = modelo;
        }
      }
    });
  };

  o.remove = function(id) {
    return $http.delete('/modelos/' + id + '.json').success(function(data){
      for(var i = o.modelos.length - 1; i >= 0; i--) {
        if(o.modelos[i].id === id) {
          o.modelos.splice(i, 1);
        }
      }
    });
  };


  return o;
}]);