'use strict';

var slugify = require("underscore.string/slugify");

module.exports = function(app) {
  var Page = app.models.page;

  var pagesController = {

    listPages: function(req, res) {
      setTimeout(function() {
        Page.find({}, function(err, pages) {
          if (err) {
            console.error(err);
            res.status(500).json(erro);
          }
          res.json(pages);
        });
      }.bind(this), 5000);
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

  }

  return pagesController;
};
