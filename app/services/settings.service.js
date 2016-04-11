(function(angular){
	angular.module('settings-service', [])
	.service('settingsService', settingsService);

	settingsService.$inject = ['$q', '$timeout'];
	function settingsService($q, $timeout) {
		/* Connect to DB for user settings */
//		var db = new PouchDB('settings');
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
		
		function initializeSettings() {
			/**
			 * Check if user settings have been setup
			 * @success => Sync Settings
			 * @failure => Create User Settings Doc
			 */
			var deferred = $q.defer();
			
			db.get('userSettings')
			.then(function(userSettings) {
				settings = angular.copy(userSettings);
				
				deferred.resolve();
			})
			.catch(function(error) {
				var defaultSettings = angular.copy(settings);
				defaultSettings._id = "userSettings";
				defaultSettings.title = "User Settings";
				
				db.put(defaultSettings)
				.then(function(response) {
					console.log("Successfully created default user settings!");
				})
				.catch(function(error) {
					console.log(error);
				});
			});
			
			return deferred.promise;
		}
		
		function get(key) {
			return settings[key];
		}

		function set(key, value) {
			if (!locked) {
//				locked = true;
				
				settings[key] = value;
				
//				db.get('userSettings')
//				.then(function(userSettings) {
//					userSettings[key] = value;
//					
//					return db.put(userSettings)
//					.then(function(response) {
//						console.log("Successfully updated user setting!");
//						locked = false;
//					})
//					.catch(function(error) {
//						console.log(error);
//						locked = false;
//					});
//				})
//				.catch(function(error) {
//					console.log(error);
//					locked = false;
//				});
			}
			else {
				$timeout(function() {
					set(key, value);
				}, 1000);
			}
		}
	};
})(angular);