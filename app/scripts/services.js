'use strict';
/* Services */
var apiUrl = 'http://radiodepaul.herokuapp.com/api/v2/';

angular.module('radio.services', [])
  .factory('Page', function() {
   var title = 'Radio DePaul';
   return {
     title: function() { return title + " | Radio DePaul"; },
     setTitle: function(newTitle) { title = newTitle }
   };
}).factory('News', ['$http', '$routeParams', function($http, $routeParams){
  return {  
    query: function(callback) {
    $http.jsonp(apiUrl + 'news/?callback=JSON_CALLBACK').
    success(function(data, status, headers, config) {
         callback(data);
        });
  },
    get: function(callback) {
      $http.jsonp(apiUrl + 'news/'+$routeParams['id']+'.js?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
          callback(data);
    });
  }
}
}]).factory('Events', ['$http', function($http){
  return {
    query: function(callback) {
      $http.jsonp(apiUrl + 'events/?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    } 
  }
}]).factory('Sponsors', ['$http', function($http){
  return {
    query: function(callback) {
      $http.jsonp(apiUrl + 'sponsors/?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    } 
  }
}]).factory('Schedule', ['$http', function($http){
  var _onair;
  return {
    query: function(callback) {
      $http.jsonp(apiUrl + 'schedule/?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    },
    onair: function(callback) {
      if (angular.isDefined(_onair)) {
        callback(_onair)
      } else {
        $http.jsonp(apiUrl + 'schedule/?on_air&callback=JSON_CALLBACK').
        success(function(data, status, headers, config) {
              _onair = data;
              callback(_onair);
        });
      }
    },    
  }}]).factory('Managers', ['$http', function($http){
  return {
    query: function(callback) {
      $http.jsonp(apiUrl + 'managers/?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    } 
  }}]).factory('Awards', ['$http', function($http){
  return {
    query: function(callback) {
      $http.jsonp(apiUrl + 'awards/?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    } 
  }}]).factory('Shows', ['$http', '$routeParams', function($http, $routeParams){
  var _onair;

  return {
    get: function(callback) {
      $http.jsonp(apiUrl + 'shows/' + $routeParams['id'] +'/?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    },
    query: function(callback) {
      $http.jsonp(apiUrl + 'shows/?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    } 
  }}]).factory('Staff', ['$http', '$routeParams', function($http, $routeParams){
  return {
    get: function(callback) {
    $http.jsonp(apiUrl + 'people/' + $routeParams['id'] +'?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    },     
    query: function(callback) {
      $http.jsonp(apiUrl + 'people/?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    }
  }}]);

  angular.module('Audio5', []).factory('AudioService', function () {
  "use strict";

  var params = {
    swf_path:'/swf/audio5js.swf',
    throw_errors:true,
    format_time:true
  };

  var audio5js = new Audio5js(params);

  return audio5js;
});