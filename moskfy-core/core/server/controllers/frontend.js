'use strict';
var fs = require('fs');

var frontendDir = 'frontend/';

module.exports = function(app) {
  var Page = app.models.page;

  var PageController = {

    index: function(req, res) {
      var context = {
        website: {
          name: 'Creative - Start Bootstrap Theme',
          description: 'Your Favorite Source of Free Bootstrap Themes'
        },
        page: {
          title: 'Start Bootstrap',
          content: 'algum texto aqui',
        }
      }
      res.render('index', context);
    },

    getPage: function(req, res) {
      Page.findOne({'slug': req.params.slug}).exec()
        .then(
          function(page) {
            var context = {
              page: {
                title: page.title,
                content: page.content,
                permaLink: page.slug
              }
            }
            res.render('index', context);
          },
          function(err) {
            console.error(err);
            res.status(404).json(err);
          });
    }

  };

  return PageController;
};
