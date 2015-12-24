'use strict';

var slugify = require("underscore.string/slugify");
var path = require('path');
var _ = require('lodash');

module.exports = function(app) {
  var Page = app.models.page;
  var Utils = app.utils;

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
            Utils.templates.getListTemplates(function(templates) {
              var template = _.findWhere(templates, {'name': page.template});
              if (!template) {
                page.template = 'Default';
              }
              return res.status(200).json(page);
            });
          },
          function(err) {
            console.error(err);
            res.status(500).json(err);
          });
    },

    getTemplatesList: function(req, res) {
      Utils.templates.getListTemplates(function(templates) {
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
