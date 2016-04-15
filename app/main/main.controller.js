(function(angular) {
	angular
		.module('main')
		.controller('MainController', MainController);
	
	MainController.$inject = ['$scope', '$rootScope', '$timeout', '$mdDialog', '$state', 'NgMap'];
	function MainController($scope, $rootScope, $timeout, $mdDialog, $state, NgMap) {
		var vm = this;
		
		vm.toggleMenu = toggleMenu;
		
		vm.go = function(toState) {
			$state.go('shell.main.content.' + toState);
		};
		
		vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDFE4JugB8qV4O2BO_JsfsZTinm_BKSOVk";
		
		NgMap.getMap()
		.then(function(map) {
			console.log(map.getCenter());
			console.log('markers', map.markers);
			console.log('shapes', map.shapes);
		});

		/*
		 * Internal
		 */
		function toggleMenu() {
			$("#menu-bar").slideToggle();
		}
		
		$("#main-content").fadeIn("slow");
	};
})(angular);