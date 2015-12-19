'use strict';

module.exports =  function(app) {

  var pagesController = app.controllers.pages;

  app.route('/pages')
    .get(pagesController.getListPages)
    .post(pagesController.createPage);

  app.route('/pages/:id')
    .get(pagesController.getPage)
    .put(pagesController.updatePage)
    .delete(pagesController.deletePage);

  app.route('/newPage')
    .get(pagesController.newPage);

};
