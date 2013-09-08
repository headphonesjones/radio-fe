'use strict';
/* Services */
var apiUrl = 'http://radiodepaul.herokuapp.com/api/v1/'; 
/* var apiUrl = 'http://localhost:3000/api/v1/';*/

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
    $http.jsonp(apiUrl + 'news_posts.js?callback=JSON_CALLBACK').
    success(function(data, status, headers, config) {
         callback(data);
        });
  },
    get: function(callback) {
      $http.jsonp(apiUrl + 'news_posts/'+$routeParams['id']+'.js?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
          callback(data);
    });
  }
}
}]).factory('Events', ['$http', function($http){
  return {
    query: function(callback) {
      $http.jsonp(apiUrl + 'events.js?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    } 
  }
}]).factory('Schedule', ['$http', function($http){
  return {
    query: function(callback) {
      $http.jsonp(apiUrl + 'slots.js?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    } 
  }}]).factory('Managers', ['$http', function($http){
  return {
    query: function(callback) {
      $http.jsonp(apiUrl + 'managers.js?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    } 
  }}]).factory('Awards', ['$http', function($http){
  return {
    query: function(callback) {
      $http.jsonp(apiUrl + 'awards.js?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    } 
  }}]).factory('Shows', ['$http', '$routeParams', function($http, $routeParams){
  return {
    get: function(callback) {
      $http.jsonp(apiUrl + 'shows/' + $routeParams['id'] +'.js?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    },
    onair: function(callback) {
      $http.jsonp(apiUrl + 'shows/onair.js?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    },    
    query: function(callback) {
      $http.jsonp(apiUrl + 'shows.js?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    } 
  }}]).factory('Staff', ['$http', '$routeParams', function($http, $routeParams){
  return {
    get: function(callback) {
    $http.jsonp(apiUrl + 'people/' + $routeParams['id'] +'.js?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    },     
    query: function(callback) {
      $http.jsonp(apiUrl + 'people.js?callback=JSON_CALLBACK').
      success(function(data, status, headers, config) {
            callback(data);
      });
    }
  }}]);