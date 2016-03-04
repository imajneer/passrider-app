var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

function findElementById(id) {
    return driver.findElement(webdriver.By.id(id));
}

function loginUser(user,pass) {
    driver.get('https://employeerespss.coair.com/employeeres/PassRiderLogin.aspx');
    driver.findElement(webdriver.By.name('txtLogin')).sendKeys(user);
    driver.findElement(webdriver.By.name('txtPsswd')).sendKeys(pass);
    driver.findElement(webdriver.By.id('btnSubmit')).click();
    driver.findElement(webdriver.By.id('MainContent_btnSubmit')).click();
}


function searchFlight(from,to,depart) {
    findElementById('txtFrom').sendKeys(from);
    findElementById('txtTo').sendKeys(to);
    findElementById('cboFlightType').click();
    driver.findElement(webdriver.By.css('#cboFlightType [value=ow]')).click();
    findElementById('erBtn').click();
}


loginUser('prestontem','zeppelin');
searchFlight('SFO','IAH','3/10/2016');

driver.wait(function() {
 return driver.getTitle().then(function(title) {
   return title === 'webdriver - Google Search';
 });
}, 1000);

driver.quit();