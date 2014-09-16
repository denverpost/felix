app.factory('getData', function($http) {
	return {
		getJSON: function(callback) {
			$http.get('data/test.json').success(callback);
		}
	}
});