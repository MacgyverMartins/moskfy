'use strict';

module.exports = function(app) {
  var controller = {};

  controller.page = function(req, res) {
    var pageName = req.params.page;
    var user = {name: 'joao', email: 'joal@teste.com'};
    var context = {title: 'contato', content: 'entre em contato', user: user};
    res.render('page-' + pageName, context);
  };

  return controller;
};
