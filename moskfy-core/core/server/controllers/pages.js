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
      console.log('req,', req.body);
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

  }

  return pagesController;
};