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
             "img/Monogramupdated.png", "img/Monogramupdated.min.svg", 
             "img/finalwelcomeSPELLING.png", "img/finalwelcomeSPELLING.min.svg", 
             "img/OurStoryTitle.png", "img/OurStoryTitle.min.svg", 
             "img/AttireNEW1box.png", "img/AttireNEW1box.min.svg", 
             "img/AttireTitle.png", "img/AttireTitle.min.svg", 
             "img/WeddingPartyTitle.png", "img/WeddingPartyTitle.min.svg", 
             "img/WeddingEventsTitle.png", "img/WeddingEventsTitle.min.svg", 
             "img/TravelTitle.png", "img/TravelTitle.min.svg", 
             "img/GiftsTitle.png", "img/GiftsTitle.min.svg", 
             "img/RSVPtitle.png", "img/RSVPtitle.min.svg",
             "img/Herside.min.svg", "img/Hisside.min.svg"];
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
