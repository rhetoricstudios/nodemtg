var express = require('express');
var cards = require('./routes/cards');
var email = require('./routes/email');
var app = express();

process.on('uncaughtException', function(err) {
	console.log('Caught exception' + err);
});

app.get('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/cards', cards.findAll);
//app.get('/cards/:id', cards.findById);
app.get('/cards/name/:name', cards.findByName);
app.get('/cards/id/:id', cards.findById);

app.get('/cards/search', cards.findByParams);

app.post('/email/send', email.sendEmailRequest);

app.listen(3000);
console.log('Listening on port 3000...');