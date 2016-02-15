angular.module('common.factory')
.factory('insertos', [
'$http',
function($http){
  var o = {
    insertos: []
  };


  o.getAll = function() {
  	return $http.get('/insertos.json').success(function(data){
      angular.copy(data, o.insertos);
    });
  };

  o.create = function(inserto) {
	  return $http.post('/insertos.json', inserto).success(function(data){
	    o.insertos.push(data);
	  });
	};

  o.remove = function(id) {
    return $http.delete('/insertos/' + id + '.json').success(function(data){
      for(var i = o.insertos.length - 1; i >= 0; i--) {
        if(o.insertos[i].id === id) {
          o.insertos.splice(i, 1);
        }
      }
    });
  };

  return o;
}]);