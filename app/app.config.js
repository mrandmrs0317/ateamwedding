/*
 * This is for setting up application wide configurations
 * I theme the colors for the app here using the Material Design $mdThemingProvider
 */
(function(angular){
	angular.module('ateam')
	.config(['$mdThemingProvider', function($mdThemingProvider) {
		$mdThemingProvider.definePalette('amazingPaletteName', {
		    '50': '#EFD7D4',
		    '100': '#EFD7D4',
		    '200': '#EFD7D4',
		    '300': '#EFD7D4',
		    '400': '#EFD7D4',
		    '500': '#DDC0C1',
		    '600': '#DDC0C1',
		    '700': '#DDC0C1',
		    '800': '#DDC0C1',
		    '900': '#DDC0C1',
		    'A100': '#DFB0AF',
		    'A200': '#DFB0AF',
		    'A400': '#DFB0AF',
		    'A700': '#DFB0AF',
		    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
		                                        // on this palette should be dark or light
		    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
		     '200', '300', '400'],
		    'contrastLightColors': undefined    // could also specify this if default was 'dark'
		  });
		// Set the application color scheme
		$mdThemingProvider.theme('default')
	    .primaryPalette('amazingPaletteName', {
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