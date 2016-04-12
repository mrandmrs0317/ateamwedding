(function(angular){
	angular.module('rsvp-service', [])
	.service('rsvpService', rsvpService);

	rsvpService.$inject = ['$q', '$timeout', '$rootScope'];
	function rsvpService($q, $timeout, $rootScope) {
		/* Connect to DB for user settings */
		
		var DB_NAME = 'guest_list';
		var db = new PouchDB(DB_NAME);
		var username = 'mporrimestrongemandideci';
		var password = 'de96aaab20972295712a1ce5733e9b242e56c916';
		var remoteDb = 'https://' + username + ':' + password + '@mataco817.cloudant.com/' + DB_NAME;
		var locked = false;
		
//		db.changes({
//			since : 'now',
//			live : true
//		}).on('change', notifySubscribers);

		var service = {
			subscribe : function(scope, callback) {
				subscribe(scope, callback);
			},
			getByName : function(firstName, lastName) {
				return getByName(firstName, lastName);
			},
			getByGroup : function(group) {
				return getByGroup(group);
			},
			getByLastName : function(partialId) {
				return getByLastName(partialId);
			}
		};
		
		if (remoteDb) {
			sync();
		}

		return service;
		
		function subscribe(scope, callback) {
			var handler = $rootScope.$on('database-service-event', callback);
			scope.$on('$destroy', handler);
		}
		
		function getByName(firstName, lastName) {
			var deferred = $q.defer();
			
			function fingGuestByFullName(guest, emit) {
				if (guest.firstName === firstName && guest.lastName === lastName) {
					emit(guest);
				}
			}
			
			db.query(fingGuestByFullName, {
				include_docs : true
			})
			.then(function(result) {
				if (result.rows.length > 0) {
					deferred.resolve(result.rows[0]);
				}
				else {
					deferred.reject("No guests found with name '" + firstName + " " + lastName + "'");
				}
			})
			.catch(function(error) {
				console.log(error);
				deferred.reject(error);
			});
			
			return deferred.promise;
		}
		
		function getByGroup(group) {
			var deferred = $q.defer();
			
			function fingByGroup(guest, emit) {
				if (guest.group === group) {
					emit(guest);
				}
			}
			
			db.query(fingByGroup, {
				include_docs : true
			})
			.then(function(result) {
				if (result.rows.length > 0) {
					deferred.resolve(result.rows);
				}
				else {
					deferred.reject("No guests found with group '" + group + "'");
				}
			})
			.catch(function(error) {
				console.log(error);
				deferred.reject(error);
			});
			
			return deferred.promise;
		}
		
		function getByLastName(partialId) {
			var deferred = $q.defer();
			
			function fingGuestByPartialId(guest, emit) {
				var nameArray = guest._id.split(' ');
				var lastName;
				switch(nameArray.length) {
					case 0:
					case 1:
						lastName = undefined;
						break;
					case 2:
						lastName = nameArray[1];
						break;
					case 3:
						lastName = nameArray[2];
						break;						
				}
				
				if (lastName === partialId) {
					emit(guest);
				}
			}
			
			db.query(fingGuestByPartialId, {include_docs : true})
			.then(function(result) {
				if (result.rows.length > 0) {
					deferred.resolve(result.rows[0]);
				}
				else {
					deferred.reject("No guests found with last name '" + partialId + "'");
				}
			})
			.catch(function(error) {
				console.log(error);
				deferred.reject(error);
			});
			
			return deferred.promise;
		}
		
		function notifySubscribers(changes) {
			$rootScope.$emit('database-service-event', {
				changes : changes
			});
		}
		
		function sync() {
			var opts = {
				continuous: true
			};
			
//			db.replicate.to(remoteDb, opts, syncError);
//			db.replicate.from(remoteDb, opts, syncError);
			db.sync(remoteDb, opts)
			.on('error', syncError);
		}
		
		function syncError(err) {
			console.log("sync error: " + err);
		}
	};
})(angular);