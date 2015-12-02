var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
  var schema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    content: {
      type: String,
      required: false,
    },
    //templateActive: {
      //type: String,
      //required: true
    //}
  });

  return mongoose.model('Page', schema);
};
