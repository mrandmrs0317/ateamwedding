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
		}]);
})(angular);