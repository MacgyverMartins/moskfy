'use strict';
//TODO
var path = require('path');
var fs = require("fs");
var async = require('async');
var _ = require('lodash');

var frontendDir = 'frontend/';

module.exports = function(app) {
  var Page = app.models.page;

  function getListTemplates (callback) {
    fs.readdir(app.get('views'), function(err, files) {
      if (err) {
        return console.error(err);
      }

      var pagesFiles = _.filter(files, justHbs);
      async.map(pagesFiles, getTemplateName, function(err, results){
        if (err) {
          res.status(500);
          return console.error(err);
        }
        results.push({name: 'Default', file: 'index.hbs'});
        if (callback && typeof(callback) === 'function') {
          return callback(_.remove(results, null));
        }
      });
    });
  }

  function getTemplateName (file, callback) {
    fs.readFile('../theme/'+ file, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      var name = data.match(/\{\{\!\s*templateName\:\s*(.*)\s*\}\}/);
      if (name) {
        var obj = {
          name: name[1].trim(),
          file: file
        };
        return callback(null, obj);
      }
      return callback(null, name);
    });
  }

  function justHbs (file) {
    return path.extname(file) == '.hbs';
  }

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
          return res.status(404).json(page);
        }
        getListTemplates(function(templates) {
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
