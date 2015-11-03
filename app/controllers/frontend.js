'use strict';
var fs = require('fs');

var frontendDir = 'frontend/';

module.exports = function(app) {
  var PageController = {

    index: function(req, res) {
      var context = {
        website: {
          name: 'Creative - Start Bootstrap Theme',
          description: 'Your Favorite Source of Free Bootstrap Themes'
        },
        page: {
          title: 'Start Bootstrap',
          content: '',
          sections: [{
            title: 'Your Favorite Source of Free Bootstrap Themes',
            content: 'Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!'
          }, {
            title: "We've got what you need!",
            content: 'Start Bootstrap has everything you need to get your new website up and running in no time! All of the templates and themes on Start Bootstrap are open source, free to download, and easy to use. No strings attached!'
          }, ]
        }
      }
      res.render('index', context);
    },

    page: function(req, res) {
      res.render('page');
    }

  };

  return PageController;
};
