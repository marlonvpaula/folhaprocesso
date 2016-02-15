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

  o.create = function(fabricante) {
	  return $http.post('/fabricantes.json', fabricante).success(function(data){
	    o.fabricantes.push(data);
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