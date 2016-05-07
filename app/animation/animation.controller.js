(function(angular) {
	angular
		.module('ateam')
		.controller('AnimationController', AnimationController);
	
	AnimationController.$inject = ['$scope', '$rootScope'];
	function AnimationController($scope, $rootScope) {
		var states = ['home', 'ourStory', 'attire', 'weddingParty', 'weddingEvents', 'gettingThere', 'registry', 'rsvp'];
		var verticalStates = ['attire', 'weddingParty', 'weddingEvents'];
		
		$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState) {
			var animated = $('ui-view.page');
			
			animated.removeClass('scrolled');
//			animated.removeClass('modal');
			
//			$scope.anim = 'modal';
			
//			animated.addClass($scope.anim);
			
			var toStateArr = toState.name.split('.');
			var toStateStr = toStateArr[toStateArr.length - 1];
			
			var fromStateArr = fromState.name.split('.');
			var fromStateStr = fromStateArr[fromStateArr.length - 1];
			
			var forward = isForward(toStateStr, fromStateStr);
			
			if (forward) {
				$('#animated').removeClass('backward');
//				switch (toState.name) {
//				case 'shell.main.content.1':
//				case 'shell.main.content.2':
//					$scope.anim = 'scrolled';
//					break;
//				case 'shell.main.content.3':
//					$scope.anim = 'modal';
//					break;
//				}
			}
			else {
				$('#animated').addClass('backward');
//				switch (toState.name) {
//				case 'shell.main.content.1':
//					$scope.anim = 'scrolled';
//					break;
//				case 'shell.main.content.2':
//				case 'shell.main.content.3':
//					$scope.anim = 'modal';
//					break;
//				}
			}
			
			var vertical = isVertical(toStateStr, fromStateStr);
			$scope.anim = vertical ? 'scrolled-vert' : 'scrolled';
			
			animated.addClass($scope.anim);
		});
		
		function isForward(toState, fromState) {
			var toIndex = states.indexOf(toState);
			var fromIndex = states.indexOf(fromState);
			
			console.log(fromIndex);
			if (toIndex > fromIndex) {
				return true;
			}
			else {
				return false;
			}
		}
		
		function isVertical(toState, fromState) {
			var toStateIsVertical = verticalStates.indexOf(toState) > -1;
			var fromStateIsVertical = verticalStates.indexOf(fromState) > -1;
			
			return toStateIsVertical && fromStateIsVertical;
		}
	};
})(angular);