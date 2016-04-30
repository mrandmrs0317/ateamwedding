angular.module('ateam', [
    /* Material Design Modules */
	'ngMaterial',
	'ngMessages',
	'ngAnimate',
	'ng',
	
	/* A-Team Modules */
	'shell',
	'login',
	'main',
	'rsvp',
	
	/* Google Map Module */
	'ngMap',

	'ui.router',
	/* Services */
	'settings-service', 'rsvp-service', 'util-service'
]);