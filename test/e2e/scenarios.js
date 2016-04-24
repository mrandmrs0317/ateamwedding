'use strict';

describe('ATeam App', function() {
	var EC = protractor.ExpectedConditions;

	it('should redirect to /#/login', function() {
		browser.get('');
		browser.getLocationAbsUrl()
		.then(function(url) {
			expect(url).toEqual('/login');
		});
	});
	
	describe('Login view', function() {
		browser.get('/#/login');
		
		it('should show our names and ask for password', function() {
			expect(element(by.id('mono')).isDisplayed()).toBe(true);
			
			var password = element(by.model('loginCtrl.password'));
			password.getText().then(function(text) {
				expect(text).toBeFalsy();
			});
		});
	});
	
	describe('Login attemps', function() {
		beforeEach(function() {
			browser.get('/#/login');
		});
		
		it('should be redirect to /#/login on login failure', function() {
			var password = element(by.model('loginCtrl.password'));
			
			var loginBtn = element(by.buttonText('Login'));
			var started = loginBtn.click();

			browser.wait(started, 5 * 1000, 'Server should start within 5 seconds');
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/login');
			});
		});
		
		it('should be redirect to /#/main/home on login success', function() {
			var password = element(by.model('loginCtrl.password'));
			password.sendKeys('Berberla');
			
			var loginBtn = element(by.buttonText('Login'));
			loginBtn.click()
			.then(function() {
				browser.wait(EC.visibilityOf($('#welcome-modal')), 3000);
				browser.getLocationAbsUrl().then(function(url) {
					expect(url).toEqual('/main/home');
					
					describe('Main Desktop View', describeMainDesktopView);
				});
			});
		});
	});

	function describeMainDesktopView() {
		it ('should show welcome modal popup', function() {			
			expect(hasClass(element(by.tagName('body')), 'md-dialog-is-showing')).toBe(true);
			
			expect(element(by.tagName('img')).isDisplayed()).toBe(true);
			
			var okayBtn = element(by.buttonText('Okay, got it!'));
			okayBtn.click()
			.then(function() {
				expect(hasClass(element(by.tagName('body')), 'md-dialog-is-showing')).toBe(false);
			});
		});

		it('should display all tabs', function() {
			browser.wait(EC.not(EC.visibilityOf($('#welcome-modal'))), 5000);
			
			var tabPages = element(by.css('.hide-sm.hide-xs')).all(by.tagName('span'));
			
			expect(tabPages.count()).toBe(9);
			expect(tabPages.getText()).toEqual(['HOME', 'OUR STORY', 'DETAILS', '', '', '', 'GETTING THERE', 'REGISTRY', 'RSVP']);

			
			describe('Desktop Tab Views', describeDesktopTabViews);
		});
		
	}
	
	function describeDesktopTabViews() {
		it('should visit our story page', function() {				
			var ourStoryBtn = element(by.buttonText('Our Story'));
			browser.wait(EC.elementToBeClickable(ourStoryBtn), 1000);
			
			ourStoryBtn.click();
			
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/main/our_story');
			});
		});
	
		it('should visit getting there page', function() {				
			var gettingThereBtn = element(by.buttonText('Getting There'));
			browser.wait(EC.elementToBeClickable(gettingThereBtn), 500);
			
			gettingThereBtn.click();
			
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/main/getting_there');
			});
		});
	
		it('should visit registry page', function() {
			var registryBtn = element(by.buttonText('Registry'));
			browser.wait(EC.elementToBeClickable(registryBtn), 500);
			
			registryBtn.click();
			
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/main/registry');
			});
		});
	
		it('should visit rsvp page', function() {
			var rsvpBtn = element(by.buttonText('RSVP'));
			browser.wait(EC.elementToBeClickable(rsvpBtn), 500);
			
			rsvpBtn.click();
			
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/main/rsvp');
			});
		});
	}
	
	var hasClass = function (element, cls) {
	    return element.getAttribute('class').then(function (classes) {
	        return classes.split(' ').indexOf(cls) !== -1;
	    });
	};
});