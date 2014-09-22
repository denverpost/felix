//'use strict';

var app = angular.module("felix", [
    'ngRoute',
    'felixControllers',
    'felixServices'
    ]);

app.config(['$routeProvider',
    function ($routeProvider)
    {
        $routeProvider.
            when('/projects',
            {
                templateUrl: 'partials/project-index.html',
                controller: 'ProjectIndexCtrl',
                object: 'project',
                title: 'Project Control'
            }).
            when('/projects/create',
            {
                templateUrl: 'partials/project-create.html',
                controller: 'ProjectCreateCtrl',
                object: 'project',
                title: 'Create a project'
            }).
            when('/projects/:slug/edit',
            {
                templateUrl: 'partials/project-edit.html',
                controller: 'ProjectEditCtrl',
                object: 'project',
                title: 'Edit project'
            }).
            when('/projects/:slug/delete',
            {
                templateUrl: 'partials/project-delete.html',
                controller: 'ProjectDeleteCtrl',
                object: 'project',
                title: 'Delete project'
            }).
            when('/projects/:slug/css',
            {
                templateUrl: 'partials/css.html',
                controller: 'CssCtrl',
                object: 'project',
                title: 'Edit CSS'
            }).
            otherwise({
                redirectTo: '/projects'
            });
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
                    $rootScope.object = current.$$route.object;
                }
            });
    }]);
