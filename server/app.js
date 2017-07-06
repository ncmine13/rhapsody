var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

var ChargeController = require('./controllers/ChargeController');
var ShopController = require('./controllers/ShopController');
app.use('/charge', ChargeController);
app.use('/shop', ShopController);


server.listen(3000, function(){
	console.log('server is listening on port 3000')
})