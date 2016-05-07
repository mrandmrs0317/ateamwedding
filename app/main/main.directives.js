(function(angular) {
	angular
		.module('main')
		/*
		 * This directive adjusts the position of the 
		 * history content based on the size of the toolbar
		 */
		.directive('myContent', ['$mdMedia', function($mdMedia) {
			return {
				restrict : "A",
				link : function(scope, element, attrs) {
					scope.$watch(function() {
						return $mdMedia('gt-sm');
					}, adjustHeight);

					scope.$watch(function() {
						return $mdMedia('xs');
					}, adjustHeight);
					
					var adjusting = false;
					function adjustHeight() {
						if (!adjusting) {
							adjusting = true;
							var toolbarHeight = $('#main-toolbar').css("height");
							element.css({
								"height" : "calc(100vh - " + toolbarHeight + ")"
							});
							
							adjusting = false;
						}
					}
				}
			};
		}])
		.directive('resizer', ['$mdMedia', function($mdMedia) {
			return {
				restrict : "A",
				link : function(scope, element, attrs) {
					scope.$watch(function() {
						return $mdMedia('gt-sm');
					}, adjust);

					scope.$watch(function() {
						return $mdMedia('xs');
					}, adjust);
					
					var adjusting = false;
					function adjust() {
						if (!adjusting) {
							adjusting = true;
							
							var toolbarHeight = parseInt($('#main-toolbar').css("height"));
							var extraSpace = toolbarHeight - parseInt(element.css("height"));
							var top = extraSpace / 2;
							
							element.css({
								"top" : top + "px"
							});
							
							adjusting = false;
						}
					}
				}
			};
		}])
		.directive('defer', ['$timeout', function($timeout) {
			return {
				restrict : "A",
				link : function(scope, element, attrs) {
					scope.$watch(function() {
						if (scope.map) {
							return scope.map.directionsRenderers[0].directions;
						}
						return scope.map;
					}, showDirections);
					
					function showDirections(value) {
						if (value) {
							$timeout(function() {
								$('.test').slideDown(3000);
							}, 1000);
						}
//						console.log("nere");
//						console.log("nere");
					}
				}
			};
		}]);
})(angular);