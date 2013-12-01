'use strict';
/* Services */
/*var apiUrl = 'http://radiodepaul.herokuapp.com/api/v1/'; */
var apiUrl = 'http://162.243.122.136:80/api/v2/';

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
}]).factory('Schedule', ['$http', function($http){
  return {
    query: function(callback) {
      $http.jsonp(apiUrl + 'schedule/?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    } 
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
  return {
    get: function(callback) {
      $http.jsonp(apiUrl + 'shows/' + $routeParams['id'] +'/?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    },
    onair: function(callback) {
      $http.jsonp(apiUrl + 'shows/?on_air&callback=JSON_CALLBACK').
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