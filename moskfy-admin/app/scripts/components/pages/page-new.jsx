'use strict';
var React = require('react');
var Ui = require('material-ui');
var Paper = Ui.Paper;
var TextField = Ui.TextField;


var PageNew = React.createClass({
  render: function() {
    return (
      <Paper zDepth={1}>
        <div style={{padding: '25px'}}>
          <TextField
            fullWidth={true}
            hintText="Nome da página"
            floatingLabelText="Nome da página" />
        </div>
      </Paper>
    );
  }
});

module.exports = PageNew;
