(function(angular) {
	angular
		.module('rsvp')
		.controller('RSVPController', RSVPController);

	RSVPController.$inject = ['$scope', '$state', 'guestListService'];
	function RSVPController($scope, $state, guestListService) {
		var vm = this;
		
		vm.result = "";
		vm.party = [];
		vm.groupName = "";
		
		vm.find = function() {			
			guestListService.getByName(vm.firstName, vm.lastName)
			.then(function(guestInfo) {
				vm.result = guestInfo;
//				vm.groupName = guest.groupName;
				
//				guestListService.getByGroup(vm.result.doc.group)
//				.then(function(party) {
//					vm.party = [];
//					for(var i = 0; i < party.length; i++) {
//						if (party[i].id !== vm.result.id) {
//							vm.party.push(party[i]);
//						}
//					}
//				});
			},
			function(reason) {
				console.log(reason);
				
//				if (vm.lastName && vm.lastName !== "") {
//					var partialId = vm.lastName;
//					
//					guestListService.getByLastName(partialId)
//					.then(function(guest) {
//						vm.result = guest;
//						vm.groupName = guest.groupName;
//						
//						guestListService.getByGroup(vm.result.doc.group)
//						.then(function(party) {
//							for(var i = 0; i < party.length; i++) {
//								if (party[i].id !== vm.result.id) {
//									vm.party.push(party[i]);
//								}
//							}
//						});
//					});
//				}
			});
		};
		
		function rsvpListUpdates(event, update) {
			vm.list = update.records;
		}
		
		guestListService.subscribe($scope, rsvpListUpdates);
	};
})(angular);
