/*
 * This is for setting up application wide configurations
 * I theme the colors for the app here using the Material Design $mdThemingProvider
 */
(function(angular){
	angular.module('appConfig', [])
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
	}]);
})(angular);