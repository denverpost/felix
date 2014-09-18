var felixControllers = angular.module('felixControllers', ['felixServices']);


felixControllers.controller('ProjectIndexCtrl', ['$scope', '$http',
    function($scope, $http)
    {

    }]);

felixControllers.controller('ProjectCreateCtrl', ['$scope', '$http',
    function($scope, $http)
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
                    'name': $scope.name,
                    'slug': $scope.slug
                }
            }

            // It's valid, so let's send the data to our backend form handler
            // and write it to a file.

            // ^^^ NOTE: Domain of handler is hard-coded, needs to not be.
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

                });

        }
    }]);


felixControllers.controller('ProjectEditCtrl', ['$scope', 'dataFactory',
    function($scope, dataFactory)
    {
        $scope.edit_meta = angular.fromJson(dataFactory.query());
}]);
