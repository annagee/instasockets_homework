var express = require('express');
var app = express();
var server = require('http').createServer(app);
var Instagram = require('instagram-node-lib');
var http = require('http');
server = http.createServer(app); // Create an HTTP server.
server.listen(process.env.PORT || 3000); // Listen on the default port, or on 4000 if there's not one.

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function(req,res){
  res.render('index')
})