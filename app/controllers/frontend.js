'use strict';
var fs = require('fs');

var frontendDir = 'frontend/';

function filePath(name, prefix) {
  var arquivo;
  if (prefix) {
    return arquivo = frontendDir + prefix + '-' + name + '.hbs';
  }
  return arquivo = name + '.hbs';
}

module.exports = function(app) {
  var PageController = {

    index: function(req, res) {
      res.render('index');
    },

    page: function(req, res) {
      res.render('page');
    }

  };

  return PageController;
};
