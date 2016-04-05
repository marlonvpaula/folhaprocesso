angular.module('common.directives')
.directive('uploadImage', function () {
return {
 restrict: 'A',
 link: function (scope, elem, attrs) {
  var reader = new FileReader();
  reader.onload = function (e) {
    // retrieves the image data from the reader.readAsBinaryString method and stores as data
    // calls the uploadImage method, which does a post or put request to server
    scope.user.imageData = btoa(e.target.result);
    scope.uploadImage(scope.user.imagePath);
    // updates scope
    scope.$apply();
  };

  // listens on change event
  elem.on('change', function() {
    console.log('entered change function');
    var file = elem[0].files[0];
    // gathers file data (filename and type) to send in json
    scope.user.imageContent = file.type;
    scope.user.imagePath = file.name;
    // updates scope; not sure if this is needed here, I can not remember with the testing I did...and I do not quite understand the apply method that well, as I have read limited documentation on it.
    scope.$apply();
    // converts file to binary string
    reader.readAsBinaryString(file);
  });
 },
 // not sure where the restangular dependency is needed. This is in my code from troubleshooting scope issues before, it may not be needed in all locations. will have to reevaluate when I have time to clean up code.
 // Restangular is a nice module for handling REST transactions in angular. It is certainly optional, but it was used in my project.
 controller: ['$scope', 'Restangular', function($scope, Restangular){
  $scope.uploadImage = function (path) {
   // if updating user
    if ($scope.user.id) {
      // do put request
      $scope.user.put().then( function (result) {
        // create image link (rails returns the url location of the file; depending on your application config, you may not need baseurl)
        $scope.userImageLink = baseUrl + result.image_url;
      }, function (error) {
        console.log('errors', JSON.stringify(errors));
      });
    } else {
      // if user does not exist, create user with image
      Restangular.all('users')
      .post({user: $scope.user})
      .then(function (response) { 
        console.log('Success!!!');
      }, function(error) {
        console.log('errors', JSON.stringify(errors));
      });
    }
   };
 }]
};
});