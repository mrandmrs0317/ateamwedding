(function(angular){
	angular.module('settings-service', [])
	.service('settingsService', settingsService);

	settingsService.$inject = ['$q', '$timeout', '$cookies'];
	function settingsService($q, $timeout, $cookies) {
		var locked = false;
		
		var settings = {
			"loggedIn" : false
		};

		var service = {
			getSetting : function(key) {
				return get(key);
			},
			setSetting : function(key, value) {
				set(key, value);
			}
		};

		return service;
		
		function get(key) {
			return settings[key];
		}

		function set(key, value) {
			settings[key] = value;
			
			if (key === "loggedIn") {				
				$cookies.putObject('loggedIn', { "hash": value, "time" : moment()});
			}
		}		
	};
})(angular);