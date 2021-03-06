'use strict';

var express = require('express');
var routemaster = require('routemaster');
var bodyParser = require('body-parser');

var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);
var serverPort = 3200;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routemaster({
    directory: './routes',
    Router: express.Router
}));

app.set('view engine', 'template');
app.engine('template', require('hogan-express'));

server.listen(serverPort, function(){
    console.info('UMF listening on port', serverPort);
});
