'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';

const Paper = require('material-ui/lib/paper');
const TextField = require('material-ui/lib/text-field');
const RaisedButton = require('material-ui/lib/raised-button');

const PageActions = require('../actions/PageActions');


class PagePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: ''
    };

    this.handleSave = this.handleSave.bind(this);
    this.changedTitle = this.changedTitle.bind(this);
    this.changedContent = this.changedContent.bind(this);
  }

  handleSave(event) {
    PageActions.savePage(this.state);
  }

  changedTitle(event) {
    this.setState({ title: event.target.value });
  }

  changedContent(event) {
    this.setState({ content: event.target.value });
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
            floatingLabelText="Nome da página"
            onChange={this.changedTitle} />

          <TextField
            style={{marginTop:'50px'}}
            fullWidth={ true }
            hintText="Insira aqui o conteúdo da página"
            multiLine={true}
            onChange={this.changedContent} />

          <div style={{textAlign:'right', paddingTop:'50px'}}>
          <RaisedButton label="Salvar" secondary={true} onTouchTap={this.handleSave} />
          </div>

        </div>
      </Paper>
    );
  }
}

//PagePost.propTypes = propTypes;

export default PagePost;
