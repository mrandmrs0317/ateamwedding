(function(angular) {
	angular
		.module('rsvp')
		.controller('RSVPController', RSVPController);

	RSVPController.$inject = ['$scope', '$state', 'rsvpService'];
	function RSVPController($scope, $state, rsvpService) {
		var vm = this;
		
		vm.result = "";
		vm.party = [];
		
		vm.find = function() {
//			var id = [vm.firstName, vm.lastName].join(" ");
			
			rsvpService.getByName(vm.firstName, vm.lastName)
			.then(function(guest) {
				vm.result = guest;
				
				rsvpService.getByGroup(vm.result.doc.group)
				.then(function(party) {
					vm.party = [];
					for(var i = 0; i < party.length; i++) {
						if (party[i].id !== vm.result.id) {
							vm.party.push(party[i]);
						}
					}
				});
			},
			function(reason) {
				console.log(reason);
				var partialId = vm.lastName;
				
				rsvpService.getByLastName(partialId)
				.then(function(guest) {
					vm.result = guest;
					
					rsvpService.getByGroup(vm.result.doc.group)
					.then(function(party) {
						for(var i = 0; i < party.length; i++) {
							if (party[i].id !== vm.result.id) {
								vm.party.push(party[i]);
							}
						}
					});
				});
			});
		};
		
		function rsvpListUpdates(event, update) {
			vm.list = update.records;
		}
		
		rsvpService.subscribe($scope, rsvpListUpdates);
	};
})(angular);
