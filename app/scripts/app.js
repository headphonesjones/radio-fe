'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('radio', ['ngRoute', 'ngSanitize', 'radio.filters', 'radio.services', 'radio.directives', 'radio.controllers', 'ngAnimate', 'ajoslin.promise-tracker', 'ngDisqus', 'flickr', 'Audio5']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeController'});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'AboutController'});
    $routeProvider.when('/about/:tab', {templateUrl: 'partials/about.html', controller: 'AboutController'}); 
    $routeProvider.when('/media', {templateUrl: 'partials/media.html', controller: 'MediaController'});
    $routeProvider.when('/people', {templateUrl: 'partials/staff.html', controller: 'StaffListController'});
    $routeProvider.when('/people/:id', {templateUrl: 'partials/person.html', controller: 'StaffController'});
    $routeProvider.when('/shows', {templateUrl: 'partials/shows.html', controller: 'ShowListController'});
    $routeProvider.when('/shows/:id', {templateUrl: 'partials/show.html', controller: 'ShowController'});
    $routeProvider.when('/station_news', {templateUrl: 'partials/news_list.html', controller: 'NewsListController'});
    $routeProvider.when('/station_news/:id', {templateUrl: 'partials/news_story.html', controller: 'NewsStoryController'});
    $routeProvider.when('/schedule', {templateUrl: 'partials/schedule.html', controller: 'ScheduleController'});
    $routeProvider.when('/webcam', {templateUrl: 'partials/webcam.html', controller: 'WebcamController'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);


myApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.cache = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
   }
]);

window.disqus_shortname = "radiodepaul";

function loadJS(src, callback) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onreadystatechange = s.onload = function() {
        var state = s.readyState;
        if (!callback.done && (!state || /loaded|complete/.test(state))) {
            callback.done = true;
            callback();
        }
    };
    document.getElementsByTagName('head')[0].appendChild(s);
}