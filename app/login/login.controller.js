(function(angular) {
	angular
		.module('login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$state'];
	function LoginController($scope, $state) {
		var vm = this;

		vm.login = function() {
			$("#login-card").slideUp("slow", function() {
//				settingsService.getSetting("loggedIn")
//				$state.transitionTo('shell.main');
				$scope.$emit('login-event', {loggedIn: true});
			});
		};
		
//		vm.test = function() {
//		};
	};
})(angular);
