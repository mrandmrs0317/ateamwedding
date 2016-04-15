(function(angular) {
	angular
		.module('appRoutes')
		.controller('AnimationController', AnimationController);
	
	AnimationController.$inject = ['$scope', '$rootScope'];
	function AnimationController($scope, $rootScope) {
		$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState) {
			var animated = $('ui-view.page');
			
			animated.removeClass('scrolled');
			animated.removeClass('modal');
			
			$scope.anim = 'modal';
			
			animated.addClass($scope.anim);
			
//			var forward = toState.name > fromState.name;
//			if (forward) {
//				$('#test3').removeClass('backward');
//				switch (toState.name) {
//				case 'shell.main.content.1':
//				case 'shell.main.content.2':
//					$scope.anim = 'scrolled';
//					break;
//				case 'shell.main.content.3':
//					$scope.anim = 'modal';
//					break;
//				}
//			}
//			else {
//				$('#test3').addClass('backward');
//				switch (toState.name) {
//				case 'shell.main.content.1':
//					$scope.anim = 'scrolled';
//					break;
//				case 'shell.main.content.2':
//				case 'shell.main.content.3':
//					$scope.anim = 'modal';
//					break;
//				}
//			}
//			
//			animated.addClass($scope.anim);
		});
	};
})(angular);