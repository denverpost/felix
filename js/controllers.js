var felixControllers = angular.module('felixControllers', ['felixServices', 'ngRoute']);

felixControllers.controller('ProjectIndexCtrl', ['$scope', '$http',
    function($scope, $http)
    {
        $http.get('data/project/list.json').success(function(data)
        {
            $scope.projects = data;
        });
    }]);

felixControllers.controller('ProjectEditCtrl', ['$scope', '$routeParams', 'projectFactory',
    function($scope, $routeParams, projectFactory)
    {
        $scope.edit_meta = angular.fromJson(projectFactory.query({slug: $routeParams.slug}));
}]);

felixControllers.controller('ProjectDeleteCtrl', ['$scope', '$routeParams', '$http', '$window',
    function($scope, $routeParams, $http, $window)
    {
        $scope.slug = $routeParams.slug;
        $scope.submit = function(form)
        {
            $scope.submitted = true;

            if ( form.$invalid ) return;
            console.log($scope);

            var submission = {
                params: {
                    'object': $scope.object,
                    'action': $scope.action,
                    'slug': $scope.slug
                }
            }

            // It's valid, so let's send the data to our backend form handler

            // ^^^ NOTE: Domain of handler is hard-coded, needs to not be.
            // ^^^ SO MUCH DUPLICATED JAVASCRIPT
            $http.jsonp('http://localhost/felix/handler.php', submission)
                .success(function(data, status, headers, submission)
                {
                    console.log(data, status, headers);
                    if ( data.status == 'OK' )
                    {
                        
                    }
                    else
                    {
                        // error handlers
                    }
                })
                .error(function(data, status, headers, submission)
                {
                    console.log(data, status, headers);
                    $window.location.href = '#/';
                });
        }
    }]);

felixControllers.controller('ProjectCreateCtrl', ['$scope', '$http', '$window',
    function($scope, $http, $window)
    {
        $scope.submit = function(form)
        {
            $scope.submitted = true;

            if ( form.$invalid ) return;
            console.log($scope);

            var submission = {
                params: {
                    'object': $scope.object,
                    'action': $scope.action,
                    'name': $scope.name
                }
            }

            // It's valid, so let's send the data to our backend form handler
            // and write it to a file.

            // ^^^ NOTE: Domain of handler is hard-coded, needs to not be.
            $http.jsonp('http://localhost/felix/handler.php', submission)
                .success(function(data, status, headers, submission)
                {
                    if ( data.status == 'OK' )
                    {
                    }
                    else
                    {
                        // error handlers
                    }
                })
                .error(function(data, status, headers, submission)
                {
                    $window.location.href = '#/';
                    console.log(data, status, headers);

                });
        }
    }]);

