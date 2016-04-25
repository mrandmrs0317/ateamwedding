'use strict';

var RsvpPage = require('../pages/rsvp.js'); 
var MainPage = require('../pages/main.js');

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
				browser.wait(EC.visibilityOf($('#welcome-modal')), 5000);
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

		it('should display all tabs and dropdown items', function() {
			browser.wait(EC.not(EC.visibilityOf($('#welcome-modal'))), 5000);
			
			var tabPages = element(by.css('.hide-sm.hide-xs')).all(by.tagName('span'))
			.filter(function(elem, index) {
				return elem.getText().then(function(text) {
					return text !== '';
				});
			});

			expect(tabPages.count()).toBe(6);
			expect(tabPages.getText()).toEqual(['HOME', 'OUR STORY', 'DETAILS', 'GETTING THERE', 'REGISTRY', 'RSVP']);

			var dropDown = element(by.buttonText('Details'));
			dropDown.click();
			
			var dropDownPages = element.all(by.binding('item.string'));
			
			expect(dropDownPages.count()).toBe(3);
			expect(dropDownPages.getText()).toEqual(['Attire', 'Wedding Party', 'Wedding Events']);
				
			element(by.tagName('md-backdrop')).click();
			
			describe('Desktop Tab Views', describeDesktopTabViews);			
		});
		
	}
	
	function describeDesktopTabViews() {
		var mainPage;
		beforeEach(function() {
			mainPage = new MainPage(EC);
		});
		
		it('should visit our story page', function() {
			mainPage.goToPage(EC, 'Our Story');
//				var ourStoryBtn = element(by.buttonText('Our Story'));
//				browser.wait(EC.elementToBeClickable(ourStoryBtn), 1000);
//			
//				ourStoryBtn.click();
				
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/main/our_story');
			});
		});
		
		it('should visit the attire page', function() {
			mainPage.goToPage(EC, 'Attire');
//				var ourStoryBtn = element(by.buttonText('Our Story'));
//				browser.wait(EC.elementToBeClickable(ourStoryBtn), 1000);
//			
//				ourStoryBtn.click();
				
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/main/attire');
			});
		});
		
		it('should visit wedding party page', function() {
			mainPage.goToPage(EC, 'Wedding Party');
//				var ourStoryBtn = element(by.buttonText('Our Story'));
//				browser.wait(EC.elementToBeClickable(ourStoryBtn), 1000);
//			
//				ourStoryBtn.click();
				
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/main/wedding_party');
			});
		});
		
		it('should visit wedding events page', function() {
			mainPage.goToPage(EC, 'Wedding Events');
//				var ourStoryBtn = element(by.buttonText('Our Story'));
//				browser.wait(EC.elementToBeClickable(ourStoryBtn), 1000);
//			
//				ourStoryBtn.click();
				
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/main/wedding_events');
			});
		});
	
		it('should visit getting there page', function() {				
//			var gettingThereBtn = element(by.buttonText('Getting There'));
//			browser.wait(EC.elementToBeClickable(gettingThereBtn), 500);
//			
//			gettingThereBtn.click();

			mainPage.goToPage(EC, 'Getting There');
			
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/main/getting_there');
			});
		});
	
		it('should visit registry page', function() {
//			var registryBtn = element(by.buttonText('Registry'));
//			browser.wait(EC.elementToBeClickable(registryBtn), 500);
//			
//			registryBtn.click();
//			
			mainPage.goToPage(EC, 'Registry');
			
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/main/registry');
			});
		});
	
		it('should visit rsvp page', function() {
//			var rsvpBtn = element(by.buttonText('RSVP'));
//			browser.wait(EC.elementToBeClickable(rsvpBtn), 500);
//			
//			rsvpBtn.click();

			mainPage.goToPage(EC, 'RSVP');

			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/main/rsvp');
				
				describe('RSVP Desktop view', function() {
					var rsvpPage;
					
					beforeEach(function() {
						rsvpPage = new RsvpPage(EC);
					});
					
					it('should not return anything on empty search', function() {
						rsvpPage.search()
						.then(function() {
							expect(element(by.id('party-card')).isDisplayed()).toBe(false);
						});
					});
					
					it('should return results for valid name', function() {
						rsvpPage.setFirstName("Aaron");
						rsvpPage.setLastName("Morabito");
						
						rsvpPage.search()
						.then(function() {
							browser.wait(EC.visibilityOf($('#party-card')), 5000);
							expect(element(by.id('party-card')).isDisplayed()).toBe(true);
							
							var results = element.all(by.binding('person.value'));
							var party = element(by.binding('vm.result.groupName'));
							
							expect(party.getText()).toEqual('A-Team');
							expect(results.getText()).toContain('Aaron Morabito');
							expect(results.getText()).toContain('Alexandra Osorio');
						});
					});
				});
			});
		});
	}
	
	var hasClass = function (element, cls) {
	    return element.getAttribute('class').then(function (classes) {
	        return classes.split(' ').indexOf(cls) !== -1;
	    });
	};
});