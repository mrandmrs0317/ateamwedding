var RsvpPage = function() {
	var firstNameInput = element(by.model('yourName'));
	var firstNameInput = element(by.model('yourName'));
	var greeting = element(by.binding('yourName'));

	this.get = function() {
		browser.get('http://www.angularjs.org');
	};

	this.setName = function(name) {
		nameInput.sendKeys(name);
	};

	this.getGreeting = function() {
		return greeting.getText();
	};
};