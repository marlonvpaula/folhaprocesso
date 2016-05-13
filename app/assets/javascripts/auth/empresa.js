angular.module('common.factory')
.factory('empresas', [
'$http',
function($http){
  var o = {
    empresas: []
  };


  o.getAll = function() {
  	return $http.get('/empresas.json').success(function(data){
      angular.copy(data, o.empresas);
    });
  };

  o.get = function(id) {
    return $http.get('/empresas/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.create = function(empresa) {
	  return $http.post('/empresas.json', empresa).success(function(data){
	    o.empresas.push(data);
      return data;
	  });
	};

  o.update = function(id, empresa) {
    return $http.put('/empresas/' + id + '.json', empresa).success(function(data){
      for(var i = o.empresas.length - 1; i >= 0; i--) {
        if(o.empresas[i].id === id) {
          o.empresas[i] = empresa;
        }
      }
    });
  };

  o.remove = function(id) {
    return $http.delete('/empresas/' + id + '.json').success(function(data){
      for(var i = o.empresas.length - 1; i >= 0; i--) {
        if(o.empresas[i].id === id) {
          o.empresas.splice(i, 1);
        }
      }
    });
  };

  return o;
}]);