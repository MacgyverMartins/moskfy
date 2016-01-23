'use strict';

var express = require('express');
var router = express.Router();

module.exports =  function(app) {
  var pagesController = app.controllers.pages;
  var formsController = app.controllers.forms;

  app.use('/api', router);

  router.route('/pages')
    .get(pagesController.getListPages)
    .post(pagesController.createPage);

  router.route('/pages/:id')
    .get(pagesController.getPage)
    .put(pagesController.updatePage)
    .delete(pagesController.deletePage);

  router.route('/templates')
    .get(pagesController.getTemplatesList);

  router.route('/forms')
    .get(formsController.list)
    .post(formsController.create);

  router.route('/forms/:id')
    .get(formsController.getForm)
    .put(formsController.update)
    .delete(formsController.delete);
};
