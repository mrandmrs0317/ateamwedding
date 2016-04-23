angular.module('ateam', [
    /* Material Design Modules */
	'ngMaterial',
	'ngMessages',
	'ngAnimate',
	
	/* A-Team Modules */
	'appConfig',
	'appRoutes',
	'shell',
	'login',
	'main',
	'rsvp',
	
	/* Google Map Module */
	'ngMap',
	
	/* Services */
	'settings-service', 'rsvp-service', 'util-service'
]);