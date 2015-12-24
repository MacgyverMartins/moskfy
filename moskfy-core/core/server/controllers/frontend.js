'use strict';
//TODO
var path = require('path');
var fs = require('fs');
var async = require('async');
var _ = require('lodash');

var frontendDir = 'frontend/';

module.exports = function(app) {
  var Page = app.models.page;
  var Utils = app.utils;

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
          return res.status(500).json(err);
        } else if (!page || page === null) {
          return fs.stat(path.join(app.get('views'), '404.hbs'), function(err, stats) {
            if (err && err.code == 'ENOENT') {
              return res.status(404).send('<div class="notfound-page">'
                + '<h1>404</h1>'
                + '<p>Page Not Found</p>'
                + '</div>');
            }
            console.log('stats', stats);
            return res.status(404).render('404.hbs');
          });
        }
        Utils.templates.getListTemplates(function(templates) {
          var template = _.findWhere(templates, {'name': page.template});
          if (template) {
            return res.render(template.file, {page: page});
          }
          return res.render('index.hbs', {page: page});
        });
      });
    }

  };

  return PageController;
};
