var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    inputs: [{
      type: {type: String, required: true},
      element: String
    }]
  });

  return mongoose.model('Form', schema);
};
