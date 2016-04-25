'use strict';

var MainPage = function(EC) {
//	browser.get('/#/main/rsvp');
	browser.get('/#/login');
	
	var password = element(by.model('loginCtrl.password'));
	password.sendKeys('Berberla');
	
	var loginBtn = element(by.buttonText('Login'));
	loginBtn.click();
	
	browser.wait(EC.visibilityOf($('#welcome-modal')), 5000);
	
	var okayBtn = element(by.buttonText('Okay, got it!'));
	okayBtn.click();
	
	browser.wait(EC.not(EC.visibilityOf($('#welcome-modal'))), 5000);
	
//	this.toTitleCase = function(str) {
//		console.log(str);
//	    return str.replace(/\w\S*/g, function(txt) {
//	    	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//    	});
//	};
};

MainPage.prototype = Object.create({}, {
	pages: { 
		get: function () { 
//			var tabPages = element(by.css('.hide-sm.hide-xs')).all(by.tagName('span'))
//			.filter(function(elem, index) {
//				return elem.getText().then(function(text) {
//					return text !== '' && text !== 'DETAILS';
//				});
//			});
//			
//			element(by.buttonText('Details')).click();
//			
//			var dropDownPages = element.all(by.binding('item.string'));
//			
//			element(by.tagName('md-backdrop')).click();
//			
//			for (var i = 0; i < dropDownPages.count(); i++) {
//				tabPages.push(dropDownPages.get(i));
//			}
			
//			browser.wait(EC.not(EC.visibilityOf(element(by.tagName('md-backdrop')))), 5000);
			
			return ['Home', 'Our Story', 'Attire', 'Wedding Party', 'Wedding Events', 'Getting There', 'Registry', 'RSVP'];
		}
	},
	dropDownPages: {
		get: function() {
			return ['Attire', 'Wedding Party', 'Wedding Events'];
		}
	},
	pageAt: { 
		get: function (idx) { 
			return this.tabList.get(idx).getText(); 
		}
	},
	goToPage: { 
		value: function (EC, name) {
//			function toTitleCase(str) {
//				console.log(str);
//			    return str.replace(/\w\S*/g, function(txt) {
//			    	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//		    	});
//			}
//			var pages = this.tabList;
						
//			var dropDownPages = ['Attire', 'Wedding Party', 'Wedding Events'];
			
			var dropDownIndex = this.dropDownPages.indexOf(name); 
			if (dropDownIndex > -1) {
//				for (var i = 0; i < pages.length; i++) {
//				if (this.pages[name]) {
					var btn = element(by.buttonText('Details'));
					
					btn.click()
					.then(function() {
						element(by.buttonText(name)).click();
					});
//				}
//				}
			}
			else {
//				for (var i = 0; i < pages.length; i++) {
//					var pageActual = toTitleCase(pages.get(i).getText().toLowerCase());
//					console.log(pageActual);
					if (this.pages.indexOf(name) > -1) {
						var btn = element(by.buttonText(name));
//						browser.wait(EC.not(EC.visibilityOf(element(by.tagName('md-backdrop')))), 5000);
						btn.click();
					}
//				}
			}
		}
	}
});

module.exports = MainPage;