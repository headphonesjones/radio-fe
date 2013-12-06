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
        $scope.twitter_loaded = false;
        $scope.getWidth = function() {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        };
        $scope.$watch($scope.getWidth, function(newValue, oldValue) {
            if ($scope.twitter_loaded === false && newValue >= 768) {
                $scope.twitter_loaded = true
                $scope.loadtwitter();
            }
        });
        window.onresize = function(){
            $scope.$apply();
        }

        $scope.loadtwitter = function() {
            window.twttr = (function (d,s,id) { var t, js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js=d.createElement(s); js.id=id; js.src="https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });}(document, "script", "twitter-wjs"));
            element.addClass('ng-hide');
              twttr.ready(function(twttr) {
		        twttr.widgets.createTimeline(
		          '363308094438133760',
		          angular.element(element)[0],
		          false,
		          {
		        	width: attrs.width || "700",
		        	height: attrs.height || "250",
		        	screenName: $scope.twitter,
                    linkColor: '#18cccf',
                    chrome: 'noheader transparent noborders noscrollbar nofooter',
                    theme: 'dark'
		          }
		        );
		        element.removeClass('ng-hide');
		      }); 
          }
    }
  };
});

directives.directive('podcast', function($sce) {
  return {
  	replace: true,
  	restrict: 'E',
  	scope: {
  		podcast: '=',
  	},
  	template: '<div class="podcast">' +
                '<h3>{{podcast.title}}</h3>' +
                '<h4>{{podcast.contributors}}</h4>' +
                '<p>{{podcast.description}}</p>' +
                '<div id="jwplayer_{{podcast.id}}"></div>' +
  	          '</div>',
    link: function($scope, element, attrs) {
    	$scope.url = $sce.trustAsResourceUrl($scope.podcast.file_url);
    	
	    $scope.$watch('podcast', function () {
	    	if ($scope.podcast) {
		    	jwplayer("jwplayer_"+ $scope.podcast.id).setup({
		        file: $scope.podcast.file_url,
		        width: 480,
		        height: 30,
		        primary: 'flash'
		      });
		    }
		  });

    }
  }
});

