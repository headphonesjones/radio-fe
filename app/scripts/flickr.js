var flickr = angular.module('flickr', []);


flickr.directive('flickr', function($http) {
  return {
    restrict: 'E',
      controller: function ($scope) {
        this.setPhotos = function(photos) {
          $scope.photos = photos;
          $scope.numberOfPhotos = $scope.photos.length;
          $scope.visible = true;
          $scope.photoIndex = 0
          $scope.setCurrentPhoto();
        }
        $scope.setCurrentPhoto = function() {
          $scope.currentPhoto = $scope.photos[$scope.photoIndex];
          $http.jsonp('http://api.flickr.com/services/rest/?format=json&method=flickr.photos.getSizes&photo_id=' + $scope.currentPhoto.id + '&api_key=8ba7f50062d534406009b45aeb73eb90&jsoncallback=JSON_CALLBACK').
               success(function(data, status, headers, config) {
                console.log(data);
           }); 
        }
        $scope.nextPhoto = function() {
          if ($scope.photoIndex < $scope.numberOfPhotos - 1) {
            $scope.photoIndex++;
            $scope.setCurrentPhoto();
          }
        }
        $scope.prevPhoto = function() {
          $scope.photoIndex--;
          $scope.setCurrentPhoto();
        }

      }
  }
});

flickr.directive('lightbox', function() {
  return {
    require: "^flickr",
    replace: true,
    restrict: 'E',
    templateUrl: 'partials/lightbox.html',
  }
});

flickr.directive('photoset', function($http) {
  return {
    require: "^flickr",
    replace: true,
    restrict: 'E',
    template: '<div class="thumbnail">' +
                '<h3>{{photoset.title._content}}</h3>' +
                   '<div class="thumbnail-image" ng-click="showPhotoset(photoset);">' +
                     '<img ng-src="http://farm{{photoset.farm}}.static.flickr.com/{{photoset.server}}/{{photoset.primary}}_{{photoset.secret}}_m.jpg" width="215" />' +
                   '</div>' +
               '</div>',
    scope: {
        id: '@'
    },
    link: function(scope, element, attrs, flickrCtrl) {
      $http.jsonp('http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getInfo&photoset_id=' + scope.id + '&api_key=8ba7f50062d534406009b45aeb73eb90&jsoncallback=JSON_CALLBACK').
       success(function(data, status, headers, config) {
      scope.photoset = data.photoset;
       });
    scope.showPhotoset = function (photoset) {
      $http.jsonp('http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=' + photoset.id + '&api_key=8ba7f50062d534406009b45aeb73eb90&jsoncallback=JSON_CALLBACK').
           success(function(data, status, headers, config) {
          scope.photos = data.photoset.photo;
          flickrCtrl.setPhotos(data.photoset.photo);
       }); 
    }
    }
  }

});
