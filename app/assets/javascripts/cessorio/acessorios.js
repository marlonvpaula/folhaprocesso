angular.module('common.factory')
.factory('acessorios', [
'$http',
function($http){
  var o = {
    acessorios: []
  };


  o.getAll = function() {
  	return $http.get('/acessorios.json').success(function(data){
      angular.copy(data, o.acessorios);
    });
  };

  o.get = function(id) {
    return $http.get('/acessorios/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.create = function(acessorio) {
	  return $http.post('/acessorios.json', acessorio).success(function(data){
	    o.acessorios.push(data);
	  });
	};

  o.update = function(id, acessorio) {
    return $http.put('/acessorios/' + id + '.json', acessorio).success(function(data){
      for(var i = o.acessorios.length - 1; i >= 0; i--) {
        if(o.acessorios[i].id === id) {
          o.acessorios[i] = acessorio;
        }
      }
    });
  };

  o.remove = function(id) {
    return $http.delete('/acessorios/' + id + '.json').success(function(data){
      for(var i = o.acessorios.length - 1; i >= 0; i--) {
        if(o.acessorios[i].id === id) {
          o.acessorios.splice(i, 1);
        }
      }
    });
  };

  return o;
}]);