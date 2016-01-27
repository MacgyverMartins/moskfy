'use strict';
var _ = require('lodash');
var Q = require('q');

module.exports = function(app) {
  var Form = app.models.form;
  var Utils = app.utils;

  var FormsController = {
    create: function(req, res) {
      Form.create(req.body, function(err, form) {
        if (err) {
          console.error(err);
          res.status(500).json(err);
        }
        res.status(201).json(form);
      });
    },

    list: function(req, res) {
      Form.find({}, function(err, forms) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        res.status(200).send(forms);
      });
    },

    getForm: function(req, res) {
      var _id = req.params.id;

      Form.findById(_id).lean().exec()
        .then(
          function(form) {
            if (!form) {
              return res.status(404).json({});
            }
            return res.status(200).json(form);
          },
          function(err) {
            console.error(err);
            res.status(500).json(err);
          });
    },

    update: function(req, res) {
      var _id = req.body._id;

      if (!_id) {
        return res.status(500).end();
      }

      Form.findByIdAndUpdate(_id, req.body, function(err, form) {
        if (err) {
          console.error(err);
          res.status(500).json(err);
        }
        res.status(200).json(form);
      });
    },

    delete: function(req, res) {
      var _id = req.params.id;

      Form.remove({ '_id': _id }).exec()
        .then(
          function() {
            res.status(204).end();
          },
          function(err) {
            return console.error(err);
            res.status(500).json(err);
          });
    },

    getFormByName: function(name) {
      var deferred = Q.defer();
      Form.findOne({'name': 'teste 1'}, function(err, form) {
        if (err) {
          deferred.reject(new Error(error));
        }
        deferred.resolve(form);
      });
      return deferred.promise;
    }
  }

  return FormsController;
};
