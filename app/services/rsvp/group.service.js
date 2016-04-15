(function(angular){
	angular.module('rsvp-service')
	.service('groupService', groupService);

	groupService.$inject = ['$q'];
	function groupService($q) {
		/* Connect to DB for user settings */
		var DB_NAME = 'groups';		
		var db = new PouchDB(DB_NAME);
		var username = 'pectsidessofterandoweett';
		var password = '061e6ef12a89dc0efec5ddf9484e155a1b05b565';
		var remoteDb = 'https://' + username + ':' + password + '@mataco817.cloudant.com/' + DB_NAME;

		var service = {
			getById : function(groupId) {
				return getById(groupId);
			}
		};
		
		if (remoteDb) {
			sync();
		}

		return service;
		
		function getById(groupId) {
			var deferred = $q.defer();
			
			db.query('groupDoc/nameView', {
				key : groupId,
				limit : 1
			})
			.then(function(result) {
				if (result.rows.length > 0) {
					deferred.resolve(result.rows[0].value);
				}
				else {
					deferred.reject("No groups found with number '" + groupId + "'");
				}
			})
			.catch(function(error) {
				console.log(error);
				deferred.reject(error);
			});
			
			return deferred.promise;
		}
		
		function sync() {
			var opts = {
				continuous: true
			};
			
			db.sync(remoteDb, opts)
			.on('error', syncError);
		}
		
		function syncError(err) {
			console.log("sync error: " + err);
		}
	};
})(angular);