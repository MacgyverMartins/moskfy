'use strict';
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs  = require('express-handlebars');
//var session = require('express-session');
//var passport = require('passport');

var viewDirectory = './content/theme/';

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

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(require('method-override')());

  var admin = require('../../admin');
  app.use(admin);

  //mapeando diretórios para não precisar usar 'require'
  load('models', {
      cwd: 'core/api'
    })
    .then('controllers')
    .then('routes')
    .into(app);

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  return app;
};
