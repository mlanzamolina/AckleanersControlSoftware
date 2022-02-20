const webdriver = require('selenium-webdriver');

exports.initDriver = () => {
    driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(/* ... */)
        .setFirefoxOptions(/* ... */)
        .build();
    return driver;
}
