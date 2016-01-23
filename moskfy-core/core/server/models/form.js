var mongoose = require('mongoose');
var _ = require('lodash');

module.exports = function() {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: String,
    body: [{
      type: {type: String, required: true},
      isRequired: {type: Boolean, required: true},
      name: {type: String, required: true},
      label: String,
      placeholder: String,
      choices: [{
        value: {type: String, required: true},
        text: {type: String, required: true}
      }]
    }]
  });

  schema.pre('save', function(next) {
    _.forEach(this.body, function(item) {
      if (item.type === 'checkbox' || item.type === 'radio') {
        if (_.isEmpty(item.choices)) {
          return next(
            new Error('inputs type checkbox or radio should have at least one choice')
          );
        }
      }
    });
    next();
  });

  return mongoose.model('Form', schema);
};
