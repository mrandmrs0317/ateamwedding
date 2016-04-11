(function(angular){
	angular.module('database-service', [])
	.service('databaseService', databaseService);

	databaseService.$inject = ['$rootScope', '$http', '$q'];
	function databaseService($rootScope, $http, $q) {
		/* Connect to DB */
		var db = new PouchDB('rsvp');
//		var remoteDb = 'https://' + username + ':' + password + '!@mataco817.cloudant.com/workouts';
		
		db.changes({
			since : 'now',
			live : true
		}).on('change', notifySubscribers);

		var service = {
//			initializeDatabase : function() {
//				initialize();
//			},
			subscribe : function(scope, callback) {
				subscribe(scope, callback);
			},
			saveRecord : function(record) {
				return saveRecord(record);
			},
			deleteRecord : function(record) {
				deleteRecord(record);
			}
		};
		
//		if (remoteDb) {
			/* do not sync with remote DB if testing */
//			sync();
//		}

		return service;
		
//		function initialize() {
//			notifySubscribers({
//				initialize : true
//			});
//		}
		
		function subscribe(scope, callback) {
			var handler = $rootScope.$on('database-service-event', callback);
			scope.$on('$destroy', handler);
		}
		
		function notifySubscribers(changes) {
			db.allDocs({
				include_docs : true,
				descending : true
			}, 
			function(err, doc) {
				$rootScope.$emit('database-service-event', {
					records : doc.rows,
					changes : changes
				});
			});
		}

		function saveRecord(record) {
			var deferred = $q.defer();
			
			db.put(record, function(err, result) {
				if (!err) {
					deferred.resolve();
				}
			});

			return deferred.promise;
		}

		function deleteRecord(record) {
			db.remove(record);
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
