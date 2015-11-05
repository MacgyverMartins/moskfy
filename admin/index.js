'use strict';
var express = require('express');
var app = module.exports = express();

//set middleware to admin
  //app.engine('hbs', hbs.engine);
  //app.set('view engine', 'hbs');
//app.use('/admin', express.static(__dirname + '/app/scripts'));
//app.use('/admin', express.static(__dirname + '/app/styles'));
//app.use('/admin', express.static(__dirname + '/.tmp'));

app.use('/admin', express.static(__dirname + '/app'));
app.use('/admin', express.static(__dirname + '/.tmp'));

app.get('/admin', function(req, res) {
  console.log('dirname', __dirname);
  res.sendFile(__dirname + '/app/index.html');
});
