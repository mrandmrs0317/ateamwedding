'use strict';

var MainPage = function(EC) {
	browser.get('/#/login');
	
	var password = element(by.model('loginCtrl.password'));
	password.sendKeys('Berberla');
	
	var loginBtn = element(by.buttonText('Login'));
	loginBtn.click();
	
	browser.wait(EC.visibilityOf($('#welcome-modal')), 5000);
	
	var okayBtn = element(by.buttonText('Okay, got it!'));
	okayBtn.click();

	browser.wait(EC.not(EC.visibilityOf($('#welcome-modal'))), 2000);
	
	/* Grab tab button elements */
	var tabElements = {};
	var tabNames = ['Home', 'Our Story', 'Details', 'Getting There', 'Registry', 'RSVP'];
	for (var index = 0; index < tabNames.length; index++) {
		tabElements[tabNames[index]] = {
			btn : element(by.buttonText(tabNames[index]))
		};
	}
	
	/****************************************
	 * Click on DETAILS to expand drop down *
	 * Grab drop down elements 				*
	 ****************************************/
	tabElements['Details'].btn.click();
	var dropDowns = ['Attire', 'Wedding Party', 'Wedding Events'];
	for (var index = 0; index < dropDowns.length; index++) {
		tabElements[dropDowns[index]] = {
			btn : element(by.buttonText(dropDowns[index])),
			isDropDown : true
		};
	}
	
	element(by.tagName('md-backdrop')).click();
	
	this.toolbarElements = tabElements;
};

MainPage.prototype = {
	goToPage : function(name) {
		var _element = this.toolbarElements[name];
		if (_element && _element.isDropDown) {
			this.toolbarElements['Details'].btn.click()
			.then(function() {
				browser.wait(protractor.ExpectedConditions.visibilityOf(_element), 2000);
				_element.btn.click();
			});
		}
		else if (_element) {
			_element.btn.click();
		}
	}
};

module.exports = MainPage;