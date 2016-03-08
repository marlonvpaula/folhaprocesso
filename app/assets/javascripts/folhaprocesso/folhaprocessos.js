angular.module('common.factory')
.factory('folhaprocessos', [
'$http',
function($http){
  var o = {
    folhaprocessos: []
  };


  o.getAll = function() {
  	return $http.get('/folhaprocessos.json').success(function(data){
      angular.copy(data, o.folhaprocessos);
    });
  };

  o.get = function(id) {
    return $http.get('/folhaprocessos/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.create = function(folhaprocesso) {
	  return $http.post('/folhaprocessos.json', folhaprocesso).success(function(data){
	    o.folhaprocessos.push(data);
	  });
	};

  o.update = function(id, folhaprocesso) {
    return $http.put('/folhaprocessos/' + id + '.json', folhaprocesso).success(function(data){
      for(var i = o.folhaprocessos.length - 1; i >= 0; i--) {
        if(o.folhaprocessos[i].id === id) {
          o.folhaprocessos[i] = folhaprocesso;
        }
      }
    });
  };

  o.remove = function(id) {
    return $http.delete('/folhaprocessos/' + id + '.json').success(function(data){
      for(var i = o.folhaprocessos.length - 1; i >= 0; i--) {
        if(o.folhaprocessos[i].id === id) {
          o.folhaprocessos.splice(i, 1);
        }
      }
    });
  };


  return o;
}]);