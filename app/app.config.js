/*
 * This is for setting up application wide configurations
 * I theme the colors for the app here using the Material Design $mdThemingProvider
 */
(function(angular){
	angular.module('ateam')
	.config(['$mdThemingProvider', function($mdThemingProvider) {
		// Set the application color scheme
		$mdThemingProvider.theme('default')
	    .primaryPalette('red', {
	    	'default' : 'A100',
	    	'hue-1' : '500',
	    	'hue-2' : '100',
	    })
	    .accentPalette('teal', {
	    	'default' : '500'
	    });
	}])
	.config(['$httpProvider', function($httpProvider) { 
	    //initialize get if not there
	    if (!$httpProvider.defaults.headers.get) {
	        $httpProvider.defaults.headers.get = {};    
	    }    

	    // Answer edited to include suggestions from comments
	    // because previous version of code introduced browser-related errors

	    //disable IE ajax request caching
	    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
	    // extra
	    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
	}]);
})(angular);