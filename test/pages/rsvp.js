'use strict';

var MainPage = require('../pages/main.js');

var RsvpPage = function(EC) {
//	browser.get('/#/main/rsvp');
	this._mainPage = new MainPage(EC);
//	browser.get('/#/login');
//	
//	var password = element(by.model('loginCtrl.password'));
//	password.sendKeys('Berberla');
//	
//	var loginBtn = element(by.buttonText('Login'));
//	loginBtn.click();
//	
//	browser.wait(EC.visibilityOf($('#welcome-modal')), 5000);
//	
//	var okayBtn = element(by.buttonText('Okay, got it!'));
//	okayBtn.click();

	var rsvpBtn = element(by.buttonText('RSVP'));
	browser.wait(EC.elementToBeClickable(rsvpBtn), 2000);
	
	rsvpBtn.click();
};

RsvpPage.prototype = Object.create({}, {
	firstName: { get: function () { return element(by.model('vm.firstName')); }},
	lastName: { get: function () { return element(by.model('vm.lastName')); }},
	searchButton: { get: function () { return element(by.id('search-btn')); }},
//	yourName: { get: function () { return element(by.model('yourName')); }},
//	greeting: { get: function () { return element(by.binding('yourName')).getText(); }},
//	todoList: { get: function () { return element.all(by.repeater('todo in todos')); }},
//	typeName: { value: function (keys) { return this.yourName.sendKeys(keys); }},
//	todoAt: { value: function (idx) { return this.todoList.get(idx).getText(); }},
	setLastName: { value: function (name) {
		this.lastName.sendKeys(name);
	}},
	setFirstName: { value: function (name) {
		this.firstName.sendKeys(name);
	}},
	search: { value: function () {
		return this.searchButton.click();
	}}
});

module.exports = RsvpPage;