'use strict';

/* Directives */

var directives = angular.module('radio.directives', []);

directives.directive('pagination', function() {
	return {
		template: '<div id="pagination-container">' +
		          '<ul class="pagination" ng-hide="numPages() < 2">' + 
		          '<li ng-class="{disabled: currentPage == 0}" ng-click="gotoPage(1)">«</li>' +
		          '<li ng-class="{disabled: currentPage == 0}" ng-click="prevPage()"><</li>' +
    			  '<li ng-repeat="page in pages" ng-class="{active: currentPage+1 == page}"" ng-click="gotoPage(page)">{{page}}</li>' +
                  '<li ng-class="{disabled: currentPage>= numPages() - 1}" ng-click="nextPage()">></li>' +
                  '<li ng-class="{disabled: currentPage>= numPages() - 1}" ng-click="gotoPage(numPages())">»</li></ul>' +
                  '</div>',
		replace: 'true',
		restrict: 'EA',
		scope: {
			pageSize: '=',
			count: '=',
		},
    	link: function($scope, element, attrs) {
			$scope.$parent.currentPage = $scope.currentPage = 0;
			$scope.$parent.pageSize = $scope.pageSize;
			$scope.$watch('count', function() {
				$scope.$parent.currentPage = $scope.currentPage = 0;
	    		var range = [];
				for(var i=0;i<$scope.numPages();i++) {
				  range.push(i+1);
				}
				$scope.pages = range;
			});

			$scope.numPages = function () {
				return Math.ceil($scope.count / $scope.pageSize); 
			}
			$scope.nextPage = function () {
				if ($scope.numPages() > $scope.currentPage + 1) {
					$scope.$parent.currentPage = $scope.currentPage = $scope.currentPage + 1;
				}
			}
			$scope.prevPage = function () {
				if ($scope.currentPage - 1 > 0) {
					$scope.$parent.currentPage = $scope.currentPage = $scope.currentPage - 1;				
				}
			}
			$scope.gotoPage = function (page) {
				$scope.$parent.currentPage = $scope.currentPage = page - 1;				
			}


		}		
	}
});


directives.directive('twitter', function() {
  return {
	replace: false,
  	restrict: 'EA',
	scope: {
		twitter: '=',
	},
    link: function($scope, element, attrs) {
    	element.addClass('ng-hide');
	    $scope.$watch('twitter', function () {
	    	if ($scope.twitter) {
		      twttr.ready(function(twttr) {
		        twttr.widgets.createTimeline(
		          '363308094438133760',
		          angular.element(element)[0],
		          false,
		          {
		        	width: attrs.width || "700",
		        	height: attrs.height || "250",
		        	screenName: $scope.twitter,
		          }
		        );
		        element.removeClass('ng-hide');
		      }); 
	    	}
	    }, true);
    }
  };
});

directives.directive('flickr', function() {
	return {
		restrict: 'E',
	  	controller: function ($scope) {
	  		this.setPhotos = function(photos) {
	  			$scope.photos = photos;
	  		}
	  	}
	}
});

directives.directive('lightbox', function() {
  return {
    require: "^flickr",
  	replace: true,
  	restrict: 'E',
  	//template: '<div class="lightbox">{{photos}}</div>',
  	templateUrl: 'partials/lightbox.html',
  	link: function(scope, element, attrs, flickrCtrl) {

  		//scope.currentPhoto = scope.photos[0];
  		scope.setCurrentPhoto = function(photo) {
  			scope.currentPhoto = photo;
  		}
  	}

  }
});

directives.directive('photoset', function($http) {
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
			    console.log(data);
			    scope.photos = data.photoset.photo;
			    flickrCtrl.setPhotos(data.photoset.photo);
		   }); 
		}
    }
  }

});
