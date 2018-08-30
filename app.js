///{([^{]+)}/g
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');

app.use(express.static(__dirname + '/node_modules'));
//app.use(    express.static('public'))
app.use('/', express.static(__dirname + '/public'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//treelist

server.listen(8080);