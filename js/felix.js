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
                templateURL: 'partials/projects-index.html',
                controller: 'ProjectIndexCtrl'
            }).
            otherwise(
            {
                redirectTo: '/projects'
            });
    }]);
