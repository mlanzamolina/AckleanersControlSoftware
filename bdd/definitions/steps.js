const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber')
const { expect } = require('chai');
const { By } = require('selenium-webdriver');
const { initDriver } = require('../support/driverUtil');

setDefaultTimeout(60 * 1000);

let driver;

Before(function () {
    driver = initDriver()
});

After(function () {
    driver.quit();
});


Given('Yo ingreso al login de la pagina Ackleaners', async () => {
    await driver.get('http://localhost:3000/Login');
});

When('Ingreso el usuario correcto', async () => {
    await driver.findElement(By.name('email')).sendKeys('mlanzamolina@gmail.com')
});

When('Ingreso la contraseña correcta {string}', async (string) => {
    await driver.findElement(By.name('password')).sendKeys(string)
});

When('Hago clic en el boton de iniciar sesion', async () => {
    await driver.findElement(By.name('loginButton')).click();
});

Then('Puedo ingresar exitosamente', async () => {
    let code="";
    await driver.findElement(By.id('react-landing-page')).getText().then(function(text){
        code = text;
    });
});
