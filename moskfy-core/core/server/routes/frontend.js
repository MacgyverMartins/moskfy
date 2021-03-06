'use strict';

module.exports = function(app) {

  var frontend = app.controllers.frontend;

  app.route('/')
    .get(frontend.index);

  app.route('/:slug')
    .get(frontend.getPage);

  app.route('/contact_form')
    .post(frontend.saveContact);
};
