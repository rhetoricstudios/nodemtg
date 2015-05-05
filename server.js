var express = require('express');
var cards = require('./routes/cards');

var app = express();

process.on('uncaughtException', function(err) {
	console.log('Caught exception' + err);
});

app.get('/cards', cards.findAll);
//app.get('/cards/:id', cards.findById);
app.get('/cards/name/:name', cards.findByName);
app.get('/cards/id/:id', cards.findById);

app.get('/cards/search', cards.findByParams);

app.listen(3000);
console.log('Listening on port 3000...');