//var http = require('http');
//http.createServer(function(req,res) {
//    res.writeHead(200, {'Content-Type': 'text/plain'});
//    res.end('Hello World\n');
//}).listen(3000,'127.0.0.1');
//console.log('server running at http://127.0.0.1:3000/');


var express = require('express'),
cards = require('./routes/cards');

var app = express();

app.get('/cards', cards.findAll);
//app.get('/cards/:id', cards.findById);
app.get('/cards/name/:name', cards.findByName);

app.listen(3000);
console.log('Listening on port 3000...');