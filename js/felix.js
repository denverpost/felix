//'use strict';

var app = angular.module("felix", [
    'ngRoute',
    'felixControllers',
    'felixServices']);

app.config(['$routeProvider',
    function ($routeProvider)
    {
        $routeProvider.
            when('/projects',
            {
                templateUrl: 'partials/project-index.html',
                controller: 'ProjectIndexCtrl',
                title: 'Project Control'
            }).
            when('/projects/create',
            {
                templateUrl: 'partials/project-create.html',
                controller: 'ProjectCreateCtrl',
                title: 'Create a project'
            }).
            when('/projects/edit/:slug',
            {
                templateUrl: 'partials/project-edit.html',
                controller: 'ProjectEditCtrl',
                title: 'Edit project'
            }).
            when('/projects/delete/:slug',
            {
                templateUrl: 'partials/project-delete.html',
                controller: 'ProjectDeleteCtrl',
                title: 'Delete project'
            }).
            when('/projects/css',
            {
                templateUrl: 'partials/css.html',
                controller: 'CssCtrl',
                title: 'Edit CSS'
            })
    }]);

app.run(['$location', '$rootScope',
    function($location, $rootScope)
    {
        $rootScope.$on('$routeChangeSuccess', 
            function (event, current, previous)
            {
                if (current.hasOwnProperty('$$route'))
                {
                    $rootScope.title = current.$$route.title;
                }
            });
    }]);
