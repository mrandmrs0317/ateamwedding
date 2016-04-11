(function(angular){
	angular.module('rsvp-service', [])
	.service('rsvpService', rsvpService);

	rsvpService.$inject = ['$q', '$timeout', '$rootScope'];
	function rsvpService($q, $timeout, $rootScope) {
		/* Connect to DB for user settings */
		var db = new PouchDB('rsvp');
		var username = 'sceeparioneduallineveree';
		var password = 'c466a9a7ce4d01df58ac13421e827075801cdd1f';
		var remoteDb = 'https://' + username + ':' + password + '!@mataco817.cloudant.com/rsvp';
		var locked = false;
		
		db.changes({
			since : 'now',
			live : true
		}).on('change', notifySubscribers);

		var service = {
			subscribe : function(scope, callback) {
				subscribe(scope, callback);
			},
			getById : function(id) {
				return getById(id);
			},
			getByGroup : function(group) {
				return getByGroup(group);
			},
			getByLastName : function(partialId) {
				return getByLastName(partialId);
			}
		};
		
		if (remoteDb) {
			/* do not sync with remote DB if testing */
			sync();
		}

		return service;
		
		function subscribe(scope, callback) {
			var handler = $rootScope.$on('database-service-event', callback);
			scope.$on('$destroy', handler);
		}
		
		function getById(id) {
			var deferred = $q.defer();
			
			function fingGuestById(guest, emit) {
				if (guest._id === id) {
					emit(guest);
				}
			}
			
			db.query(fingGuestById, {include_docs : true})
			.then(function(result) {
				if (result.rows.length > 0) {
					deferred.resolve(result.rows[0]);
				}
				else {
					deferred.reject("No guests found with name '" + id + "'");
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
			
			db.query(fingByGroup, {include_docs : true})
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
//			db.allDocs({
//				include_docs : true,
//				descending : true
//			}, 
//			function(err, doc) {
//				guests = angular.copy(doc.rows);
//				
				$rootScope.$emit('database-service-event', {
//					records : doc.rows,
					changes : changes
				});
//			});
		}
		
		function sync() {
			var opts = {
				continuous: true
			};
			
			db.replicate.to(remoteDb, opts, syncError);
			db.replicate.from(remoteDb, opts, syncError);
		}
		
		function syncError(err) {
			console.log("sync error: " + err);
		}
	};
})(angular);