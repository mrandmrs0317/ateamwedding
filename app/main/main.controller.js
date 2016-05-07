(function(angular) {
	angular
		.module('main')
		.controller('MainController', MainController);
	
	MainController.$inject = ['$scope', '$cookies', '$rootScope', '$timeout', '$mdDialog', '$state', '$mdSidenav', '$log', 'NgMap'];
	function MainController($scope, $cookies, $rootScope, $timeout, $mdDialog, $state, $mdSidenav, $log, NgMap) {
		var vm = this;
		
		vm.toggleSideNav = buildToggler('left');
		
		vm.sideNavOptions = ["Home", "Our Story", "Attire", "Wedding Party", "Wedding Events", "Getting There", "Registry", "RSVP"];
		
		vm.dropDownOptions = [{
			string : 'Attire',
			state : 'attire'
		},
		{
			string : 'Wedding Party',
			state : 'weddingParty'
		},
		{
			string : 'Wedding Events',
			state : 'weddingEvents'
		}];
		
		vm.loading = true;
		vm.toggleMenu = toggleMenu;
		
		vm.go = function(toState) {
			$state.go('shell.main.content.' + toState);
		};
		vm.sideNavGo = function(option) {
			vm.go(Case.camel(option));
			vm.toggleSideNav();
		};
		
		vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDFE4JugB8qV4O2BO_JsfsZTinm_BKSOVk";
		
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
		
		function buildToggler(navID) {
			return function() {
				$mdSidenav(navID)
				.toggle()
				.then(function () {
					$log.debug("toggle " + navID + " is done");
				});
			}
		}

		$("#main-page").fadeIn("slow", welcomeDialog);

		function welcomeDialog() {
			if (showCookie()) {			
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
					$cookies.putObject('welcomeCookie', moment());
				}, function() {
					$scope.status = 'You cancelled the dialog.';
				});
			}
		};
		
		function showCookie() {
			var welcomeCookie = $cookies.getObject('welcomeCookie');
			return moment().isAfter(moment(welcomeCookie).add(1, 'day'));
		}
	};
})(angular);