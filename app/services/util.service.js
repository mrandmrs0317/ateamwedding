(function(angular){
	angular.module('util-service', [])
	.service('utilService', utilService);

	utilService.$inject = ['$q', '$timeout', '$http'];
	function utilService($q, $timeout, $http) {
		var salt = "A-Team Wedding Login Keys";
		
		/* Connect to DB for user settings */
		var service = {
			login : function(password) {
				return login(password);
			}
		};

		return service;
		
		function login(_pass) {
			var deferred = $q.defer();
			
			var DB_NAME = 'keys';		
			var username = 'timinginsticanytorninear';
			var password = 'a2452418b760f2de5454164e38788403316c67ab';
			var remoteDb = 'https://' + username + ':' + password + '@mataco817.cloudant.com/' + DB_NAME;
			var db = new PouchDB(remoteDb);
			
			var shaObj = new jsSHA("SHA-512", "TEXT");
			shaObj.update(salt);
			var hash = shaObj.getHash("HEX");
			
			db.query('key/keyView', {
				key : hash,
				limit : 1
			})
			.then(function(keyResult) {
				if (keyResult.rows.length > 0) {
					var shaObj = new jsSHA("SHA-512", "TEXT");
					shaObj.setHMACKey(keyResult.rows[0].key, "HEX");
					shaObj.update(_pass);
					var hmac = shaObj.getHMAC("HEX");
					
					db.query('key/passView', {
						key : hmac,
						limit : 1
					})
					.then(function(passResult) {
						if (passResult.rows.length > 0 && passResult.rows[0].value) {
							deferred.resolve();
						}
						else {
							deferred.reject("Incorrect password.");
						}
					})
					.catch(function(error) {
						console.log(error);
						deferred.reject(error);
					});
				}
				else {
					deferred.reject("Could not verify database connection.");
				}
			})
			.catch(function(error) {
				console.log(error);
				deferred.reject(error);
			});
			
			return deferred.promise;
		}
	};
})(angular);