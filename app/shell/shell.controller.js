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
             "img/Monogramupdated.png", "img/Monogramupdated.svg", 
             "img/finalwelcomeSPELLING.png", "img/finalwelcomeSPELLING.svg", 
             "img/OurStoryTitle.png", "img/OurStoryTitle.svg", 
             "img/AttireNEW1box.png", "img/AttireNEW1box.svg", 
             "img/AttireTitle.png", "img/AttireTitle.svg", 
             "img/WeddingPartyTitle.png", "img/WeddingPartyTitle.svg", 
             "img/WeddingEventsTitle.png", "img/WeddingEventsTitle.svg", 
             "img/TravelTitle.png", "img/TravelTitle.svg", 
             "img/GiftsTitle.png", "img/GiftsTitle.svg", 
             "img/RSVPtitle.png", "img/RSVPtitle.svg",
             "img/Herside.svg", "img/Hisside.svg"];
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
