'use strict';
var express = require('express');
var app = module.exports = express();

//set middleware to admin
app.use('/styles', express.static(__dirname + '/app/styles'));
app.use(express.static(__dirname + '/.tmp'));

app.get('/admin', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});
