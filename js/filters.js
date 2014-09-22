
angular.module('felixFilters', [])
    .filter('slugify', function () {
        return function (input) 
        {
            // Adapted from:
            // https://github.com/paulsmith/angular-slugify
            // http://robandlauren.com/2014/01/29/custom-filters-angularjs/
            if (input) 
            {
                return input.toLowerCase().replace(/[-\s]+/g, "-");
            }
        };
 });
