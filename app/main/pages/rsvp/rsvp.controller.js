(function(angular) {
	angular
		.module('rsvp')
		.controller('RSVPController', RSVPController)
		.directive('party', ['$timeout', function($timeout) {
			return {
				restrict : "A",
				link : function(scope, element, attrs) {
					scope.$watch(function() {
						return attrs.party;
					}, showCard);
					
					
					function showCard(value) {
						if (value) {
							var start = element.css("display") === 'none';
							element.css({
									display : 'table',
									width : '500px'
							});
							
//							expand();
						}
						else {
							element.css({
									display : 'none',
//									height : '0%'
							});
						}
					}
					
					function expand(width) {
						var test = 1000 / 50;
						$timeout(function() {
							var nextWidth = width === undefined ? 0 : width + 1;
							if (nextWidth <= 50) {
								element.css({
									height : nextWidth.toString() + "%"
								});
								expand(nextWidth);
							}
						}, test);
					}
				}
			};
		}]);

	RSVPController.$inject = ['$scope', '$state', 'guestListService'];
	function RSVPController($scope, $state, guestListService) {
		var vm = this;
		
		vm.result = "";
		vm.party = [];
		vm.groupName = "";
		
		vm.test = {};
		
		vm.find = function() {			
			guestListService.getByName(vm.firstName, vm.lastName)
			.then(function(guestInfo) {
				vm.result = guestInfo;
				vm.found = true;
//				$('#party-card').css({
//					'display' : "flex"
//				});
//				function() {
//					$('#party-card').animate({
//						"width" : "auto"
//					});
//				})
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
		
		vm.showThing = function(person) {
			if (!vm.test[person.id]) {
				vm.test[person.id] = {
					"display" : "block"	
				};
			}
			
			var expanding = false;
			if (!person.expanded) {
				person.expanded = true;
				expanding = true;
			}
			
			$('#' + person.id).slideToggle(400, 
			function() {
				$scope.$apply(function() {
					if (!expanding) {
						person.expanded = false;
					}
				});
			});
		};
		
		function rsvpListUpdates(event, update) {
			vm.list = update.records;
		}
		
		guestListService.subscribe($scope, rsvpListUpdates);
	};
})(angular);
