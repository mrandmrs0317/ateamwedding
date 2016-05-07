(function(angular) {
	angular.module('ateam').run(runBlock);
	
	runBlock.$inject = ['settingsService', '$state', '$rootScope'];
	function runBlock(settingsService, $state, $rootScope) {
		if (settingsService.getSetting("loggedIn")) {
			$state.go('shell.main.content.home');
		}
		else {
			$state.go('shell.login');
		}
		
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			if (toState.name === "shell.main" && !settingsService.getSetting("loggedIn")) {
				event.preventDefault();
				
				if (fromState.name !== "shell.login") {
					$state.go('shell.login');
				}
			}
			else if (toState.name === "shell.login" && settingsService.getSetting("loggedIn")) {
				event.preventDefault();
				
				if (fromState.name !== "shell.main") {
					$state.go('shell.main.content.home');
				}
			}
		});
		
		function checkLoginCookie() {
			var loggedCookie = $cookies.getObject('loggedIn');
			return moment().isAfter(moment(loggedCookie.time).add(1, 'day'));
		}
	};
})(angular);