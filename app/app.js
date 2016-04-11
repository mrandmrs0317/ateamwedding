// angular.module is a global place for creating, registering and retrieving Angular modules
// 'openbarbell' is the name of this angular module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'required' modules
angular.module('ateam', [
	'ngMaterial',
	'ngMessages',
	'ngAnimate',
	'appConfig',
	'appRoutes',
	'shell',
	'login',
	'main',
	'rsvp',
//	'uiGmapgoogle-maps',
	'ngMap',
//	'preloader-factory'
	/* Services */
	'settings-service', 'rsvp-service'
//	'bluetooth-service', 'rfduino-service', 'settings-service', 'database-service'
]);