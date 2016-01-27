'use strict';
var hbs = require('express-hbs');
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

  return;
};
