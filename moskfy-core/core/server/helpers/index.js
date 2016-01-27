'use strict';
var hbs = require('express-hbs');
var fs = require('fs');
var _ = require('lodash');
var Q = require('q');

module.exports = function(app) {
  var formsController = app.controllers.forms;

  hbs.registerHelper('compare', function(left, operator, right, options) {
    /*jshint eqeqeq: false*/

    if (arguments.length < 3) {
      throw new Error('Handlebars Helper "compare" needs 2 parameters');
    }

    if (options === undefined) {
      options = right;
      right = operator;
      operator = '===';
    }

    var operators = {
      '==':     function(l, r) {return l == r; },
      '===':    function(l, r) {return l === r; },
      '!=':     function(l, r) {return l != r; },
      '!==':    function(l, r) {return l !== r; },
      '<':      function(l, r) {return l < r; },
      '>':      function(l, r) {return l > r; },
      '<=':     function(l, r) {return l <= r; },
      '>=':     function(l, r) {return l >= r; },
      'typeof': function(l, r) {return typeof l == r; }
    };

    if (!operators[operator]) {
      throw new Error('Handlebars Helper "compare" doesn\'t know the operator ' + operator);
    }

    var result = operators[operator](left, right);

    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  hbs.registerAsyncHelper('getFormByName', function(formName, cb) {
    formsController.getFormByName(formName).then(function(form) {
      var formFile = fs.readFileSync(__dirname + '/html/' + 'form.html', 'utf8');
      var template = hbs.compile(formFile);
      try {
        var template = new hbs.SafeString(template(form));
      }
      catch (err) {
        console.log('erro', err);
      }
      cb(template);
    });
  });

  return;
};
