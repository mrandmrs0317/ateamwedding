(function(angular) {
	angular
		.module('login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$state', 'utilService'];
	function LoginController($scope, $state, utilService) {
		var vm = this;

		vm.login = function() {
			utilService.login(vm.password)
			.then(function() {
				$("#login-card").slideUp("slow", function() {
					$scope.$emit('login-event', {loggedIn: true});
				});
			});
		};
	};
})(angular);
