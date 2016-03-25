angular.module('common.factory')
.factory('programadors', [
'$http',
function($http){
  var o = {
    programadors: []
  };


  o.getAll = function() {
  	return $http.get('/programadors.json').success(function(data){
      angular.copy(data, o.programadors);
    });
  };
  
  o.get = function(id) {
    return $http.get('/programadors/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.create = function(programador) {
	  return $http.post('/programadors.json', programador).success(function(data){
	    o.programadors.push(data);
	  });
	};
  
  o.update = function(id, programador) {
    return $http.put('/programadors/' + id + '.json', programador).success(function(data){
      for(var i = o.programadors.length - 1; i >= 0; i--) {
        if(o.programadors[i].id === id) {
          o.programadors[i] = programador;
        }
      }
    });
  };

  o.remove = function(id) {
    return $http.delete('/programadors/' + id + '.json').success(function(data){
      for(var i = o.programadors.length - 1; i >= 0; i--) {
        if(o.programadors[i].id === id) {
          o.programadors.splice(i, 1);
        }
      }
    });
  };

  return o;
}]);