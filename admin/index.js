'use strict';
var express = require('express');
var app = module.exports = express();

app.use('/admin', express.static(__dirname + '/app'));
app.use('/admin', express.static(__dirname + '/.tmp'));
//app.set('views', __dirname);
//app.set('view engine', 'html');

app.get('/admin', function(req, res) {
  //res.sendFile(__dirname + '/app/index.html');
  res.sendFile(__dirname + '/app/index.html');
});
