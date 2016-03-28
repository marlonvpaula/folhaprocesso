angular.module('common.factory')
.factory('desenhos', [
'$http',
function($http){
  var o = {
    desenhos: []
  };


  o.getAll = function() {
  	return $http.get('/desenhos.json').success(function(data){
      angular.copy(data, o.desenhos);
    });
  };

  o.get = function(id) {
    return $http.get('/desenhos/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.getCodigo = function(codigo) {
    return $http.get('/desenhos.json?codigo=' + codigo).then(function(res){
      return res.data;
    });
  }

  o.create = function(desenho) {
	  return $http.post('/desenhos.json', desenho).success(function(data){
	    o.desenhos.push(data);
	  });
	};

  o.update = function(id, desenho) {
    return $http.put('/desenhos/' + id + '.json', desenho).success(function(data){
      for(var i = o.desenhos.length - 1; i >= 0; i--) {
        if(o.desenhos[i].id === id) {
          o.desenhos[i] = inserto;
        }
      }
    });
  };

  o.remove = function(id) {
    return $http.delete('/desenhos/' + id + '.json').success(function(data){
      for(var i = o.desenhos.length - 1; i >= 0; i--) {
        if(o.desenhos[i].id === id) {
          o.desenhos.splice(i, 1);
        }
      }
    });
  };


  return o;
}]);