(function(angular) {
	angular
		.module('main')
		.controller('MainController', MainController);
	
	MainController.$inject = ['$scope', '$rootScope', '$timeout', '$mdDialog', '$state', 'NgMap'];
	function MainController($scope, $rootScope, $timeout, $mdDialog, $state, NgMap) {
		var vm = this;
		
		vm.dropDownOptions = [{
			string : 'Attire',
			state : 'attire'
		},
		{
			string : 'Wedding Party',
			state : 'party'
		},
		{
			string : 'Wedding Events',
			state : 'events'
		}];
		
		vm.loading = true;
		vm.toggleMenu = toggleMenu;
		
		vm.go = function(toState) {
			$state.go('shell.main.content.' + toState);
		};
		
		vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDFE4JugB8qV4O2BO_JsfsZTinm_BKSOVk";
//		vm.locatio
		
//		NgMap.getMap()
//		.then(function(map) {
//			console.log(map.getCenter());
//			console.log('markers', map.markers);
//			console.log('shapes', map.shapes);
//			
//			vm.loading = false;
//		});

		/*
		 * Internal
		 */
		function toggleMenu() {
			$("#menu-bar").slideToggle();
		}
		
		$("#main-content").fadeIn("slow", welcomeDialog);

		function welcomeDialog() {
			$mdDialog.show({
				controller: function(scope, $mdDialog) {
					scope.close = function() {
						$mdDialog.hide();
					};
				},
				templateUrl: 'app/main/pages/modal/welcome.tmpl.html',
				parent: angular.element(document.body),
				clickOutsideToClose: false,
				fullscreen: false
			})
			.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.status = 'You cancelled the dialog.';
			});
		};
	};
})(angular);