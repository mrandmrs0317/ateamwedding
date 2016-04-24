(function(angular) {
	angular
		.module('shell')
		.controller('ShellController', ShellController);

	ShellController.$inject = ['$scope', '$timeout', '$state', 'preloader', 'settingsService'];
	function ShellController($scope, $timeout, $state, preloader, settingsService) {
		var vm = this;
		
		vm.loggedIn = settingsService.getSetting("loggedIn");
		
		$scope.imageLocations = ["img/bg2.jpg", "img/mono.svg", "img/welcomefinalnooutline.png"];
		preloader.preloadImages($scope.imageLocations)
		.then(function() {
			$("#shell").fadeIn(1000);
		},
		function() {
			console.log("error");
		});
		
		$scope.$on('login-event', function(event, params) {
			vm.loggedIn = params.loggedIn;
			settingsService.setSetting("loggedIn", vm.loggedIn);
			
			$state.transitionTo('shell.main.content.home');
		});
	};
})(angular);
