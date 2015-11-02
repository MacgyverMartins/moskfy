'use strict';

module.exports = function(app) {
  var controller = {};

  controller.index = function(req, res) {
    var context = {title: 'o grande moskfy', content: 'lorem lorem lorem'}
    res.render('index', context);
  };

  return controller;
};
