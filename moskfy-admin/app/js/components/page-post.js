'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';

const Paper = require('material-ui/lib/paper');
const TextField = require('material-ui/lib/text-field');
const RaisedButton = require('material-ui/lib/raised-button');

const propTypes = {
  currentUser: React.PropTypes.object
};

class PagePost extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let main_style = {
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
            fullWidth={ true }
            hintText="Insira aqui o conteúdo da página"
            multiLine={true} />

          <div style={{textAlign:'right', paddingTop:'50px'}}>
          <RaisedButton label="Salvar" secondary={true} />
          </div>

        </div>
      </Paper>
    );
  }

}

PagePost.propTypes = propTypes;

export default PagePost;
