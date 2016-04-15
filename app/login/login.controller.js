(function(angular) {
	angular
		.module('login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$state'];
	function LoginController($scope, $state) {
		var vm = this;

		vm.login = function() {
			$("#login-card").slideUp("slow", function() {
				$scope.$emit('login-event', {loggedIn: true});
			});
		};
	};
})(angular);
