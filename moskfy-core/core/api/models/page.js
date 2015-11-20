var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
  var schema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: false,
    },
  });

  return mongoose.model('Page', schema);
};
