angular.module('common.factory')
.factory('fabricantes', ['$http',
function($http){
  var o = {
    fabricantes: []
  };


  o.getAll = function() {
  	return $http.get('/fabricantes.json').success(function(data){
      angular.copy(data, o.fabricantes);
    });
  };

  o.get = function(id) {
    return $http.get('/fabricantes/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.create = function(fabricante) {
	  return $http.post('/fabricantes.json', fabricante).success(function(data){
	    o.fabricantes.push(data);
	  });
	};

  o.update = function(id, fabricante) {
    return $http.put('/fabricantes/' + id + '.json', fabricante).success(function(data){
      for(var i = o.fabricantes.length - 1; i >= 0; i--) {
        if(o.fabricantes[i].id === id) {
          o.fabricantes[i] = fabricante;
        }
      }
    });
  };

  o.remove = function(id) {
    return $http.delete('/fabricantes/' + id + '.json').success(function(data){
      for(var i = o.fabricantes.length - 1; i >= 0; i--) {
        if(o.fabricantes[i].id === id) {
          o.fabricantes.splice(i, 1);
        }
      }
    });
  };

  return o;
}]);