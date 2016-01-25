'use strict';
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var router = express.Router();
var fs = require('fs');
//var session = require('express-session');

var viewDirectory = '../theme/';

module.exports = function() {
  var app = express();

  //variável de ambiente
  app.set('port', 3000);

  app.use(function(req, res, next) {
    if (process.env.NODE_ENV === 'development') {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
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
  app.set('view engine', 'hbs');
  app.set('views', viewDirectory);
  app.use(express.static(viewDirectory));

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.use(require('method-override')());

  function sendToAdmin (req, res) {
    if (process.env.NODE_ENV === 'development') {
      return res.send('<div class="admin-redirect">'
        + '<h1>Ops..</h1>'
        + '</br><h3>Parece que você está querendo acessar a versão de devenvolvimento do <i>Admin</i></h3>'
        + '<p>A versão de dev fica na porta <strong>:3333</strong>. '
        + '<a href="http://localhost:3333/admin">Clique aqui</a> para se redirecionado</p>'
        + '</div>');
    }
    fs.stat('../moskfy-admin/build/index.html', function(err, stat){
      if (err) {
        return console.log('err', err);
      }
      return res.sendFile('/Users/macgyvermartins/Development/Moskfy/moskfy-admin/build/index.html');
    });
  }

  app.use('/js', express.static('../moskfy-admin/build/js'));
  app.use('/css', express.static('../moskfy-admin/build/css'));
  app.use('/fonts', express.static('../moskfy-admin/build/fonts'));

  app.get('/admin', function(req, res) {
    sendToAdmin(req, res);
  });

  app.get(/\/admin(\/[A-z]*)*/, function(req, res) {
    sendToAdmin(req, res);
  });

  //mapeando diretórios para não precisar usar 'require'
  consign({
      cwd: 'core/server'
    })
    .include('models')
    .then('utils')
    .then('controllers')
    .then('routes')
    .then('helpers')
    .into(app);

  var hbs;
  hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: viewDirectory + 'layouts',
    partialsDir: viewDirectory + 'partials',
    helpers: app.helpers.index
  });
  app.engine('hbs', hbs.engine);

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  return app;
};
