'use strict';
var hbs = require('express-hbs');
var fs = require('fs');
var _ = require('lodash');
var Q = require('q');

module.exports = function(app) {
  var formsController = app.controllers.forms;

  function getTag (type) {
    var tag = {
      text: '<input type="text" name="[[name]]" placeholder="[[placeholder]]">',
      email: '<input type="email" name="[[name]]" placeholder="[[placeholder]]">',
      number: '<input type="number" name="[[name]]" placeholder="[[placeholder]]">',
      radio: '<input type="radio" name="[[name]]" value="[[value]]">[[text]]',
      checkbox: '<input type="checkbox" name="[[name]]" value="[[value]]">[[text]]'
    };
    return tag[type];
  }

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

  hbs.registerHelper('get', function(name, options) {
    var form = options.data.root;

    var item = _.findWhere(form.tags, {'name': name});
    var tag = '';
    var str = '';

    if (item.type === 'text' || item.type === 'email' || item.type === 'number') {
      tag = getTag(item.type);
      tag = tag.replace(/\[\[name\]\]/g, item.name);
      tag = tag.replace(/\[\[placeholder\]\]/g, item.placeholder);
      return new hbs.SafeString(tag)
    } else if (item.type === 'radio' || item.type === 'checkbox') {
      _.forEach(item.choices, function(field) {
        str = getTag(item.type);
        str = str.replace(/\[\[name\]\]/g, item.name);
        str = str.replace(/\[\[value\]\]/g, field.value);
        str = str.replace(/\[\[text\]\]/g, field.text);
        tag += str;
      });
      return new hbs.SafeString(tag)
      } else if (item.type === 'select') {
        tag = '<select name="[[name]]">';
        tag = tag.replace(/\[\[name\]\]/g, item.name);
        _.forEach(item.choices, function(field) {
          str = '<option value="[[value]]">[[text]]</option>'
          str = str.replace(/\[\[value\]\]/g, field.value);
          str = str.replace(/\[\[text\]\]/g, field.text);
          tag += str;
        });
        return new hbs.SafeString(tag)
      }
  });

  hbs.registerAsyncHelper('getFormByName', function(formName, cb) {
    formsController.getFormByName(formName).then(function(form) {
      if (!form) {
        return cb(new hbs.SafeString(''));
      }
      var formStart = '<form action="/contact_form" method="post">';
      var formEnd = '</form>';

      var formHTML = formStart + form.code + formEnd;

      //var formFile = fs.readFileSync(__dirname + '/html/' + 'form.html', 'utf8');
      try {
        var template = hbs.compile(formHTML);
        template = new hbs.SafeString(template(form));
      }
      catch (err) {
        console.log('erro', err);
      }
      cb(template);
    });
  });

  return;
};
