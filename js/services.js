var felixServices = angular.module('felixServices', ['ngResource']);

felixServices.factory('dataFactory', ['$resource',
	function($resource){
		return $resource('data/:jsonId.json', {}, {
			query: {method:'GET', params:{jsonId:'test'}, isArray:false}
			/* getJSON: function(callback) {
				$http.get('data/test.json').success(callback);
			} */
	});
}]);