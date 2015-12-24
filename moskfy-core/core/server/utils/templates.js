'use strict';
var path = require('path');
var fs = require("fs");
var async = require('async');
var _ = require('lodash');

module.exports = function(app) {
  function justHbs (file) {
    return path.extname(file) == '.hbs';
  }

  var helpers = {
    getListTemplates: function(callback) {
      fs.readdir(app.get('views'), function(err, files) {
        if (err) {
          return console.error(err);
        }

        function getName (file, callback) {
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

        var pagesFiles = _.filter(files, justHbs);
        async.map(pagesFiles, getName, function(err, results){
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
    },
  };

  return helpers;
};
