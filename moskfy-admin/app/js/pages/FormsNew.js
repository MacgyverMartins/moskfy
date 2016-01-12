'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header.js';

const RaisedButton = require('material-ui/lib/raised-button');
const Snackbar = require('material-ui/lib/snackbar');
const _ = require('lodash');

class FormsNew extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    debugger;
  }

  render() {
    return (
      <DocumentTitle title="Moskfy | Novo formulário">
      <div>
        <AppHeader parentView="Páginas" currentlyView="Nova página"/>

        <div style={{textAlign:'right', paddingTop:'50px'}}>
        <RaisedButton label="Salvar" secondary={true} onTouchTap={this.handleSave} />
      </div>

      <Snackbar ref="snack" autoHideDuration={1000} message="Formulário salvo com sucesso" />

      </div>
      </DocumentTitle>
    );
  }
}

FormsNew.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
};

export default FormsNew;
