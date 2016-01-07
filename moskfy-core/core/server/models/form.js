var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
    }
  });

  return mongoose.model('Form', schema);
};
