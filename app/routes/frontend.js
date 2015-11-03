'use strict';

module.exports = function(app) {

  var frontend = app.controllers.frontend;

  app.route('/')
    .get(frontend.index);

  app.route('/:page')
    .get(frontend.page);

};
