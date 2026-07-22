exports.config = {

    runner: 'local',
    specs: [
        '.src/test/specs/**/*.js'
    ],

    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        acceptInsecureCerts: true
    }],

    before: async function (capabilities, specs) {
        await browser.setWindowSize(1920, 1080);
    },


    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://practicesoftwaretesting.com/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
