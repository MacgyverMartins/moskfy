'use strict';
var http = require('http');
var app = require('./core/config/express')();
require('./core/config/database.js')('mongodb://localhost/mkteste1');

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express Server escutando na porta ' + app.get('port'));
});
