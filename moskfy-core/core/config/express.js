'use strict';
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs  = require('express-handlebars');
//var session = require('express-session');
//var passport = require('passport');

var viewDirectory = '../theme/';

module.exports = function() {
  var app = express();

  //variável de ambiente
  app.set('port', 3000);

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  //middleware
  app.use(cookieParser());
  //app.use(session({
  //secret: 'homem avestruz',
  //resave: true,
  //saveUnitialized: true
  //}));
  //app.use(express.static('./public'));

  //set middleware to frontend
  var hbs;
  hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: viewDirectory + 'layouts',
    partialsDir: viewDirectory + 'partials'
  });
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');
  app.set('views', viewDirectory);
  app.use(express.static(viewDirectory));

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  //app.use(require('method-override')());

  //mapeando diretórios para não precisar usar 'require'
  load('models', {
      cwd: 'core/server'
    })
    .then('utils')
    .then('controllers')
    .then('routes')
    .into(app);

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  return app;
};
