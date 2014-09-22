var felixServices = angular.module('felixServices', ['ngResource']);

felixServices.factory('dataFactory', ['$resource',
	function($resource){
		return $resource('data/projects/:jsonSlug/project.json', {}, {
			query: {method:'GET', params:{jsonSlug:'joe-test'}, isArray:false}
			/* getJSON: function(callback) {
				$http.get('data/test.json').success(callback);
			} */
	});
}]);
