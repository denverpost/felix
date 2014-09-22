var felixServices = angular.module('felixServices', ['ngResource']);

felixServices.factory('dataFactory', ['$resource',
	function($resource){
		return $resource('data/project/:slug/project.json', {}, {
			query: {method:'GET', params:{slug:'@slug'}, isArray:false}
			/* getJSON: function(callback) {
				$http.get('data/test.json').success(callback);
			} */
	});
}]);
