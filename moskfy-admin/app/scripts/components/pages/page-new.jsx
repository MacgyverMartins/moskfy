'use strict';
var React = require('react');
var TextFieldTitle = require('../textfield-title');
var Ui = require('material-ui');
var Paper = Ui.Paper;
var TextField = Ui.TextField;
var RaisedButton  = Ui.RaisedButton;


var PageNew = React.createClass({
  render: function() {

    var main_style = {
      margin: '56px 0 0 256px',
      padding: '20px'
    };

    return (
      <Paper zDepth={1}>
        <div style={{padding: '25px'}}>

          <TextField
            fullWidth={true}
            hintText="Nome da página"
            floatingLabelText="Nome da página" />

           <TextField
            style={{marginTop:'50px'}}
            fullWidth='true'
            hintText="Insira aqui o conteúdo da página"
            multiLine={true} />

          <div style={{textAlign:'right', paddingTop:'50px'}}>
           <RaisedButton label="Salvar" secondary={true} />
          </div>

        </div>
      </Paper>
    );
  }
});

module.exports = PageNew;
