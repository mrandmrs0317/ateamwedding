/*
 * This is for setting up the routing for the application
 */
(function(angular){
	angular.module('appRoutes', ['ui.router'])
	
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
			controller: function($scope, $rootScope, $http, $q) {
				$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
					var animated = $('ui-view.page');
					animated.removeClass('scrolled');
					animated.removeClass('modal');
							$scope.anim = 'modal';
					animated.addClass($scope.anim);
					
//					var forward = toState.name > fromState.name;
//					if (forward) {
//						$('#test3').removeClass('backward');
//						switch (toState.name) {
//						case 'shell.main.content.1':
//						case 'shell.main.content.2':
//							$scope.anim = 'scrolled';
//							break;
//						case 'shell.main.content.3':
//							$scope.anim = 'modal';
//							break;
//						}
//					}
//					else {
//						$('#test3').addClass('backward');
//						switch (toState.name) {
//						case 'shell.main.content.1':
//							$scope.anim = 'scrolled';
//							break;
//						case 'shell.main.content.2':
//						case 'shell.main.content.3':
//							$scope.anim = 'modal';
//							break;
//						}
//					}
//					
//					animated.addClass($scope.anim);
				});
			}
		})
		.state('shell.main.content.home', {
			url: '/home',
			templateUrl: 'app/main/pages/home.tmpl.html'
		})
		.state('shell.main.content.ourStory', {
			url: '/our_story',
			templateUrl: 'app/main/pages/our-story.tmpl.html'
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