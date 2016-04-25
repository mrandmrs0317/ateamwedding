'use strict';

var MainPage = require('../pages/main.js');

var RsvpPage = function(EC) {
	this._mainPage = new MainPage(EC, false);
	this._mainPage.goToPage('RSVP');
	
	browser.wait(EC.elementToBeClickable(element(by.id('search-btn'))), 2000);

	this.firstName = element(by.model('vm.firstName'));
	this.lastName = element(by.model('vm.lastName'));
	this.searchButton = element(by.id('search-btn'));
};

RsvpPage.prototype = {
	setLastName : function(name) {
		return this.lastName.sendKeys(name);
	},
	setFirstName : function(name) {
		return this.firstName.sendKeys(name);
	},
	search : function() {
		return this.searchButton.click();
	}
};

module.exports = RsvpPage;