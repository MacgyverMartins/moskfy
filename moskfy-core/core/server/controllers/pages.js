'use strict';

var slugify = require("underscore.string/slugify");
var path = require('path');
var fs = require("fs");
var async = require('async');
var _ = require('lodash');

module.exports = function(app) {
  var Page = app.models.page;

  function getListTemplates (callback) {
    fs.readdir(app.get('views'), function(err, files) {
      if (err) {
        return console.error(err);
      }

      var pagesFiles = _.filter(files, justHbs);
      async.map(pagesFiles, getTemplateName, function(err, results){
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

  var PagesController = {

    getListPages: function(req, res) {
      Page.find({}, function(err, pages) {
        if (err) {
          console.error(err);
          res.status(500).json(erro);
        }
        res.status(200).json(pages);
      });
    },

    getPage: function(req, res) {
      var _id = req.params.id;

      Page.findById(_id).lean().exec()
        .then(
          function(page) {
            if (!page) {
              return res.status(404).json({});
            }
            //page['templates'] = templates;
            return res.status(200).json(page);
          },
          function(err) {
            console.error(err);
            res.status(500).json(err);
          });
    },

    getTemplatesList: function(req, res) {
      getListTemplates(function(templates) {
        return res.json(templates);
      });
    },

    createPage: function(req, res) {
      req.body.slug = req.body.slug || req.body.title;
      req.body.slug = slugify(req.body.slug);

      if (!req.body.template) {
        req.body.template = 'Default';
      }

      Page.create(req.body, function(err, page) {
        if (err) {
          console.error(err);
          res.status(500).json(err);
        }
        res.status(201).json(page);
      });
    },

    updatePage: function(req, res) {
      var _id = req.body._id;

      Page.findByIdAndUpdate(_id, req.body, function(err, page) {
        if (err) {
          console.error(err);
          res.status(500).json(err);
        }
        res.status(200).json(page);
      });
    },

    deletePage: function(req, res) {
      var _id = req.params.id;

      Page.remove({
          '_id': _id
        }).exec()
        .then(
          function() {
            res.status(204).end();
          },
          function(err) {
            return console.error(err);
            res.status(500).json(err);
          });
    }

  }

  return PagesController;
};
