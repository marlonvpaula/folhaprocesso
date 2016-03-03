angular.module('common.factory')
.factory('grupomodelos', [
'$http',
function($http){
  var o = {
    grupomodelos: []
  };


  o.getAll = function() {
  	return $http.get('/grupomodelos.json').success(function(data){
      angular.copy(data, o.grupomodelos);
    });
  };

  o.create = function(grupomodelo) {
	  return $http.post('/grupomodelos.json', grupomodelo).success(function(data){
	    o.grupomodelos.push(data);
	  });
	};

  o.remove = function(id) {
    return $http.delete('/grupomodelos/' + id + '.json').success(function(data){
      for(var i = o.grupomodelos.length - 1; i >= 0; i--) {
        if(o.grupomodelos[i].id === id) {
          o.grupomodelos.splice(i, 1);
        }
      }
    });
  };

  return o;
}]);