'use strict';

var slugify = require("underscore.string/slugify");

module.exports = function(app) {
  var Page = app.models.page;

  var pagesController = {

    getListPages: function(req, res) {
      Page.find({}, function(err, pages) {
        if (err) {
          console.error(err);
          res.status(500).json(erro);
        }
        res.json(pages);
      });
    },

    getPage: function(req, res) {
      var _id = req.params.id;

      Page.findById(_id).exec()
        .then(
          function(page) {
            res.json(page);
          },
          function(err) {
            console.error(err);
            res.status(404).json(err);
          });
    },

    createPage: function(req, res) {
      req.body.slug = req.body.slug || req.body.title;
      req.body.slug = slugify(req.body.slug);

      Page.create(req.body)
        .then(
          function(contato) {
            res.status(201).json(contato);
          },
          function(err) {
            console.error(err);
            res.status(500).json(erro);
          });
    },

    updatePage: function(req, res) {
      var _id = req.body._id;

      Page.findByIdAndUpdate(_id, req.body).exec()
        .then(
          function(page) {
            res.json(page);
          },
          function(err) {
            console.error(err);
            res.status(500).json(err);
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

  return pagesController;
};
