'use strict';

var express = require('express');
var router = express.Router();

module.exports =  function(app) {

  var pagesController = app.controllers.pages;

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

};
