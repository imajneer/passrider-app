var webdriver = require('selenium-webdriver');
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
app.use(express.static(path.join(__dirname, 'site')));

var port = 3000;
app.set('port', process.env.PORT || 3000);

var httpServer = http.Server(app);

httpServer.listen(port, function(){
    console.log("server listening on port", port);
});
 
io = require('socket.io').listen(httpServer);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.driver = null;


io.on('connection', function(socket){
    console.log('got connection!');

	socket.on('lookForFlight',function(flight,fn) {
    	console.log('looking for flight...');
    	app.driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        buildAsync().then(function(driver) {
            app.driver = driver;
            loginUser('prestontem','zeppelin');
            searchFlight(flight.from,flight.to,flight.date);
            app.driver.wait(function () {
                return app.driver.isElementPresent(webdriver.By.className("routeTable"));
}, 5000)
.then(function() {
    app.driver.findElement(webdriver.By.className('routeTable')).getInnerHtml().then(function(html) {
                fn(html);
            });
    });
//             fn(app.driver.findElement(webdriver.By.class('routeTable')).getInnerHtml());
        });
	});
});






function findElementById(id) {
    return app.driver.findElement(webdriver.By.id(id));
}

function loginUser(user,pass) {
    app.driver.get('https://employeerespss.coair.com/employeeres/PassRiderLogin.aspx');
    app.driver.findElement(webdriver.By.name('txtLogin')).sendKeys(user);
    app.driver.findElement(webdriver.By.name('txtPsswd')).sendKeys(pass);
    app.driver.findElement(webdriver.By.id('btnSubmit')).click();
    app.driver.findElement(webdriver.By.id('MainContent_btnSubmit')).click();
}


function searchFlight(from,to,depart) {
    findElementById('txtFrom').sendKeys(from);
    findElementById('txtTo').sendKeys(to);
    findElementById('cboFlightType').click();
    app.driver.findElement(webdriver.By.css('#cboFlightType [value=ow]')).click();
    findElementById('erBtn').click();
}




