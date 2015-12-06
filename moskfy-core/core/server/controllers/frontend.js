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
      Page.findOne({'slug': req.params.slug}, function(err, page) {
        if (err) {
          console.error(err);
          return res.status(404).json(err);
        } else if (!page || page === null) {
          return res.status(404).json(page);
        }
        res.render('index', page);
      });
    }

  };

  return PageController;
};
