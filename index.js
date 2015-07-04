'use strict';
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);
var serverPort = 3200;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

server.listen(serverPort, function(){
    console.info('UMF listening on port', serverPort);
});
