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
			
			if (!_pass) {
				deferred.reject("No Password Provided.");
			}
			else {
				var shaObj = new jsSHA("SHA-512", "TEXT");
				shaObj.update(salt);
				var hash = shaObj.getHash("HEX");
				
				$http({
					url : "http://71.47.10.190:8080/getKey",
					method : "POST",
					headers : {
						'Content-Type': 'application/json',
						'Cache-Control': 'no-cache'
					},
					data : {
						"content" : hash
					}
				})
				.then(function(keyResult) {
					if (keyResult.data && keyResult.data.response) {
						var shaObj = new jsSHA("SHA-512", "TEXT");
						shaObj.setHMACKey(keyResult.data.response, "HEX");
						shaObj.update(_pass);
						var hmac = shaObj.getHMAC("HEX");
						
						$http({
							url : "http://71.47.10.190:8080/getPass",
							method : "POST",
							headers : {
								'Content-Type': 'application/json',
								'Cache-Control': 'no-cache'
							},
							data : {
								"content" : hmac
							}
						})
						.then(function(passResult) {
							if (passResult.data && passResult.data.response !== "Not Authorized") {
								deferred.resolve(passResult.data.response);
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
				},
				function(data) {
					deferred.reject("Could not verify database connection.");
				});				
			}
			
			return deferred.promise;
		}
	};
})(angular);