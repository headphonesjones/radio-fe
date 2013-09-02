'use strict';

var filters = angular.module('radio.filters', []);

filters.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }

    };
});

filters.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

filters.filter('newlines', function () {
    return function(text) {
        if(text) {
            return text.replace(/\n/g, '</p><p>');
        }
    }
});  