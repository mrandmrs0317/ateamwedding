exports.config = {
  allScriptsTimeout: 30000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions' : {
    	args: ['--lang=en', '--window-size=1024,768']
    }
  },

  chromeOnly: true,

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};