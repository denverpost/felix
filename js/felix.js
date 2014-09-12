var app = angular.module("felix", []);

app.controller('getData', function($scope, $http) {
	$http.get('data/test.json').
		success(function(data, status, headers, config) {
			$scope.test = data;
		}).
		error(function(data, status, headers, config) {
			console.log('an error');
		});
});