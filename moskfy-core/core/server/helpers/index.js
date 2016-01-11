'use strict';
var handlebars = require('handlebars');

module.exports = function(app) {

  var helpers = {
    getForm: function(context) {
      var form = '<form action="/contact_form" method="post">'
      +'<label>Nome:</label>'
      +'<input type="text" name="contact[name]" placeholder="seu nome">'
      +'<label>E-mail:</label>'
      +'<input type="text" name="contact[email]" placeholder="seu email">'
      +'<button type="submit">enviar</button>'
    +'</form>';

      return new handlebars.SafeString(form);
    }
  };

  return helpers;
};
