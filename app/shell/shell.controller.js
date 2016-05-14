(function(angular) {
	angular
		.module('shell')
		.controller('ShellController', ShellController);

	ShellController.$inject = ['$scope', '$timeout', '$state', 'preloader', 'settingsService'];
	function ShellController($scope, $timeout, $state, preloader, settingsService) {
		var vm = this;
		
		vm.loggedIn = settingsService.getSetting("loggedIn");
		
		$scope.imageLocations = [
             "img/bg.jpg", 
             "img/png/Monogramupdated.png", "img/final/Monogramupdated.min.svg", 
             "img/png/finalwelcomeSPELLING.png", "img/final/finalwelcomeSPELLING.min.svg",
             "img/png/Gifts1.png",
             "img/png/Ourstory1.png",
             "img/png/T&a.png",
             "img/png/Weddingevents1.png",
             "img/png/Attire1.png",
             "img/png/RSVP.png",
             "img/final/border.min.svg"];
             
//             "img/OurStoryTitle.png", "img/OurStoryTitle.min.svg", 
//             "img/AttireNEW1box.png", "img/AttireNEW1box.min.svg", 
//             "img/AttireTitle.png", "img/AttireTitle.min.svg", 
//             "img/WeddingPartyTitle.png", "img/WeddingPartyTitle.min.svg", 
//             "img/WeddingEventsTitle.png", "img/WeddingEventsTitle.min.svg", 
//             "img/TravelTitle.png", "img/TravelTitle.min.svg", 
//             "img/GiftsTitle.png", "img/GiftsTitle.min.svg", 
//             "img/RSVPtitle.png", "img/RSVPtitle.min.svg",
//             "img/Herside.min.svg", "img/Hisside.min.svg"];
		preloader.preloadImages($scope.imageLocations)
		.then(function() {
			$("#shell").fadeIn(1000, function() {
			});
		},
		function() {
			console.log("error");
		});
		
		$scope.$on('login-event', function(event, params) {
			settingsService.setSetting("loggedIn", params.loggedIn);
			
			$state.transitionTo('shell.main.content.home');
			$("#shell").css({"display":"block"});
		});
	};
})(angular);
