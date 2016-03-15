angular.module('common.factory')
.factory('operacaos', [
'$http',
function($http){
  var o = {
    operacaos: []
  };


  o.getAll = function() {
  	return $http.get('/operacaos.json').success(function(data){
      angular.copy(data, o.operacaos);
    });
  };

  o.get = function(id) {
    return $http.get('/operacaos/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.create = function(operacao) {
	  return $http.post('/operacaos.json', operacao).success(function(data){
	    o.operacaos.push(data);
	  });
	};

  o.update = function(id, operacao) {
    return $http.put('/operacaos/' + id + '.json', operacao).success(function(data){
      for(var i = o.operacaos.length - 1; i >= 0; i--) {
        if(o.operacaos[i].id === id) {
          o.operacaos[i] = operacao;
        }
      }
    });
  };

  o.remove = function(id) {
    return $http.delete('/operacaos/' + id + '.json').success(function(data){
      for(var i = o.operacaos.length - 1; i >= 0; i--) {
        if(o.operacaos[i].id === id) {
          o.operacaos.splice(i, 1);
        }
      }
    });
  };

  return o;
}]);