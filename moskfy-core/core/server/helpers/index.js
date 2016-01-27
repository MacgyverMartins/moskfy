'use strict';
var hbs = require('express-hbs');
var fs = require('fs');
var _ = require('lodash');
var Q = require('q');

module.exports = function(app) {
  var formsController = app.controllers.forms;

  hbs.registerHelper('link', function(text, options) {
    var attrs = [];
    for(var prop in options.hash) {
      attrs.push(prop + '="' + options.hash[prop] + '"');
    }
    return new hbs.SafeString(
      "<a " + attrs.join(" ") + ">" + text + "</a>"
    );
  });

  hbs.registerAsyncHelper('readFile', function(filename, cb) {
    console.log('filename', filename);
    console.log('cb', cb);
    setTimeout(function() {
      cb(new hbs.SafeString('<h1>macgyver</h1>'));
    }.bind(this), 3000);
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
