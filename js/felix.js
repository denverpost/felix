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
            when('/project',
            {
                templateUrl: 'partials/project-index.html',
                controller: 'ProjectIndexCtrl',
                object: '',
                title: 'Project Control'
            }).
            when('/project/create',
            {
                templateUrl: 'partials/project-create.html',
                controller: 'ProjectCreateCtrl',
                object: '',
                title: 'Create a project'
            }).
            when('/project/:slug',
            {
                templateUrl: 'partials/project-detail.html',
                controller: 'ProjectDetailCtrl',
                object: 'project',
                title: 'Project Detail'
            }).
            when('/project/:slug/edit',
            {
                templateUrl: 'partials/project-edit.html',
                controller: 'ProjectEditCtrl',
                object: 'project',
                title: 'Edit project'
            }).
            when('/project/:slug/delete',
            {
                templateUrl: 'partials/project-delete.html',
                controller: 'ProjectDeleteCtrl',
                object: '',
                title: 'Delete project'
            }).
            when('/project/:slug/article',
            {
                templateUrl: 'partials/article.html',
                controller: 'ArticleCtrl',
                object: 'project',
                subobject: 'article',
                title: 'Edit Article Text'
            }).
            when('/project/:slug/freeform/create',
            {
                templateUrl: 'partials/freeform-create.html',
                controller: 'FreeformCtrl',
                object: 'project',
                subobject: 'freeform',
                title: 'Edit Freeform'
            }).
            when('/project/:slug/css',
            {
                templateUrl: 'partials/css.html',
                controller: 'CssCtrl',
                object: 'project',
                title: 'Edit CSS'
            }).
            otherwise({
                redirectTo: '/project'
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
                    $rootScope.subobject = current.$$route.subobject;
                }
            });
    }]);
