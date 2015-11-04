'use strict';
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs  = require('express-handlebars');
//var session = require('express-session');
//var passport = require('passport');

module.exports = function() {
  var app = express();

  //variável de ambiente
  app.set('port', 3000);

  //middleware
  app.use(cookieParser());
  //app.use(session({
  //secret: 'homem avestruz',
  //resave: true,
  //saveUnitialized: true
  //}));
  //app.use(express.static('./public'));
  var hbs;
  hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: './frontend/layouts',
    partialsDir: './frontend/partials'
  });
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');
  app.set('views', './frontend');
  app.use(express.static('./frontend'));

  var admin = require('../admin');
  app.use(admin);

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(require('method-override')());

  //mapeando diretórios para não precisar usar 'require'
  load('models', {
      cwd: 'app'
    })
    .then('controllers')
    .then('routes')
    .into(app);

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  return app;
};
