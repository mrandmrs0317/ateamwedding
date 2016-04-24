/*
 * This is for setting up the routing for the application
 */
(function(angular){
	angular.module('ateam')
	
	.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('shell', {
		    url: '^/',
		    abstract: true,
			templateUrl: 'app/shell/shell.html',
		    controller: 'ShellController',
		    controllerAs: 'shellCtrl'
		})
		.state('shell.login', {
			url: 'login',
			templateUrl: 'app/login/login.tmpl.html',
		    controller: 'LoginController',
		    controllerAs: 'loginCtrl'
		})
		.state('shell.main', {
			templateUrl: 'app/main/main.html',
	        controller: 'MainController',
	        controllerAs: 'vm'
		})
		.state('shell.main.content', {
			url: '^main',
			template: '<ui-view class="page {{anim}}"></ui-view>',
			controller: 'AnimationController'
		})
		.state('shell.main.content.home', {
			url: '/home',
			templateUrl: 'app/main/pages/home.tmpl.html'
		})
		.state('shell.main.content.ourStory', {
			url: '/our_story',
			templateUrl: 'app/main/pages/our-story.tmpl.html'
		})
		.state('shell.main.content.attire', {
			url: '/attire',
			templateUrl: 'app/main/pages/attire.tmpl.html'
		})
		.state('shell.main.content.party', {
			url: '/wedding_party',
			templateUrl: 'app/main/pages/party.tmpl.html'
		})
		.state('shell.main.content.events', {
			url: '/wedding_events',
			templateUrl: 'app/main/pages/events.tmpl.html'
		})
		.state('shell.main.content.gettingThere', {
			url: '/getting_there',
			templateUrl: 'app/main/pages/getting-there.tmpl.html'
		})
		.state('shell.main.content.registry', {
			url: '/registry',
			templateUrl: 'app/main/pages/registry.tmpl.html'
		})
		.state('shell.main.content.rsvp', {
			url: '/rsvp',
			templateUrl: 'app/main/pages/rsvp/rsvp.tmpl.html',
			controller: 'RSVPController',
			controllerAs: 'vm'
		});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('login');
	}]);
})(angular);