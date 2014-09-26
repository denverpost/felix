var felixControllers = angular.module('felixControllers', ['felixServices', 'ngRoute']);

// Global, or global-ish variables
// Are globals a bad idea in Angular? We'll find out here.
function Global($scope, $http, $route, $routeParams) 
{ 
    $http.get('data/project/list.json').success(function(data)
    {
        console.log($route.current.params);
        // If there's a slug for a project, it will be in the $route object here:
        if ( typeof $route.current.params.slug !== 'undefined' ) 
        {
            $scope.project = data[$route.current.params.slug];
            $scope.slug = $route.current.params.slug;
        }

        // Populate project list in case we need it.
        $scope.projects = data;
    });
}


felixControllers.controller('ProjectIndexCtrl', ['$scope', '$http',
    function($scope, $http)
    { }]);

felixControllers.controller('ProjectDetailCtrl', ['$scope', '$http',
    function($scope, $http)
    { }]);

felixControllers.controller('ProjectEditCtrl', ['$scope', '$routeParams', 'projectFactory',
    function($scope, $routeParams, projectFactory)
    {
        $scope.edit_meta = angular.fromJson(projectFactory.query({slug: $routeParams.slug}));
}]);

function form_handler($scope, $http, $window, form, fields, redirect)
{ 
    // This handles our forms. Create, update, delete.
    console.log($scope, form); 
    $scope.submitted = true;

    if ( form.$invalid ) return;
    console.log($scope);

    
    var params = {
            'object': $scope.object,
            'action': $scope.action,
    }
    // Append the extra parameters we're handling.
    for ( var i = 0; i < fields.length; i++ )
    {
        params[fields[i]] = $scope[fields[i]];
    }
    console.log(params);
    var submission = { params: params }

    // It's valid, so let's send the data to our backend form handler
    $http.jsonp('http://localhost/felix/handler.php', submission)
        .success(function(data, status, headers, submission)
        {
            console.log(data, status, headers);
            if ( data.status == 'OK' )
            { }
            else
            { // error handlers
            }
        })
        .error(function(data, status, headers, submission)
        {
            console.log(data, status, headers);
            $window.location.href = '#/' + redirect;
        });
}

felixControllers.controller('FreeformCtrl', ['$scope', '$http', '$window'
    function($scope, $http, $window)
    { 
        // *** Need to write back-end handlers for FF's
        $scope.submit = function(form)
        {
            var fields = ['name', 'markup'];
            var redirect = '';
            form_handler($scope, $http, $window, form, fields, redirect);
        }
    }]);

felixControllers.controller('ProjectDeleteCtrl', ['$scope', '$routeParams', '$http', '$window',
    function($scope, $routeParams, $http, $window)
    {
        $scope.slug = $routeParams.slug;
        $scope.submit = function(form)
        {
            var fields = ['slug'];
            var redirect = '';
            form_handler($scope, $http, $window, form, fields, redirect);
        }
    }]);

felixControllers.controller('ProjectCreateCtrl', ['$scope', '$http', '$window',
    function($scope, $http, $window)
    {
        $scope.submit = function(form)
        {
            var fields = ['name'];
            var redirect = '';
            form_handler($scope, $http, $window, form, fields, redirect);
        }
    }]);

