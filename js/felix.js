//'use strict';
var app = angular.module("felix", [
    'ngRoute',
    'felixControllers',
    'felixServices']);

// URL routing
app.config(['$routeProvider',
    function ($routeProvider)
    {
        $routeProvider.
            when('/projects',
            {
                templateUrl: 'partials/project-index.html',
                controller: 'ProjectIndexCtrl'
            }).
            when('/projects/add',
            {
                templateUrl: 'partials/project-add.html',
                controller: 'ProjectAddCtrl'
            }).
            when('/projects/edit',
            {
                templateUrl: 'partials/project-edit.html',
                controller: 'ProjectEditCtrl'
            }).
            when('/projects/css',
            {
                templateUrl: 'partials/css.html',
                controller: 'CssCtrl'
            }).
            otherwise(
            {
                redirectTo: '/projects'
            });
    }]);