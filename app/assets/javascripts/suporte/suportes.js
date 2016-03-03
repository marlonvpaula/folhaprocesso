angular.module('common.factory')
.factory('suportes', [
'$http',
function($http){
  var o = {
    suportes: []
  };


  o.getAll = function() {
  	return $http.get('/suportes.json').success(function(data){
      angular.copy(data, o.suportes);
    });
  };

  o.get = function(id) {
    return $http.get('/suportes/' + id + '.json').then(function(res){
      return res.data;
    });
  };

  o.create = function(suporte) {
	  return $http.post('/suportes.json', suporte).success(function(data){
	    o.suportes.push(data);
	  });
	};

  o.update = function(id, suporte) {
    return $http.put('/suportes/' + id + '.json', suporte).success(function(data){
      for(var i = o.suportes.length - 1; i >= 0; i--) {
        if(o.suportes[i].id === id) {
          o.suportes[i] = suporte;
        }
      }
    });
  };

  o.remove = function(id) {
    return $http.delete('/suportes/' + id + '.json').success(function(data){
      for(var i = o.suportes.length - 1; i >= 0; i--) {
        if(o.suportes[i].id === id) {
          o.suportes.splice(i, 1);
        }
      }
    });
  };


  return o;
}]);