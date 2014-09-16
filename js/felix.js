//'use strict';

var app = angular.module("felix", [
    'ngRoute',
    'felixControllers']);

app.controller('getData', function($scope, $http) {
    $http.get('data/test.json').
        success(function(data, status, headers, config) {
            $scope.test = data;
        }).
        error(function(data, status, headers, config) {
            console.log('an error');
        });
});

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
            when('/projects/css',
            {
                templateUrl: 'partials/css-index.html',
                controller: 'CssCtrl'
            }).
            otherwise(
            {
                redirectTo: '/projects'
            });
    }]);
