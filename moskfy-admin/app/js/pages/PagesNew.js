'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header.js';
import PagePost from '../components/page-post.js';

import PageStore from '../stores/PageStore';
import PageActions from '../actions/PageActions';

const RaisedButton = require('material-ui/lib/raised-button');
const Snackbar = require('material-ui/lib/snackbar');
const _ = require('lodash');

class PagesNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };

    this.handleSave = this.handleSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.redirectToPage = this.redirectToPage.bind(this);
  }

  redirectToPage() {
  }

  componentDidMount() {
    this.unsubscribe = PageStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChange(event) {
    switch (event.payload) {
      case 'onGetNewPage':
        break;
      case 'onPageSave':
        this.refs.snack.show();
        setTimeout(function() {
          var url = `/pages/${event.data._id}`;
          this.context.history.pushState(null, url);
        }.bind(this), 1001);
        break;
    }
  }

  handleSave(event) {
    var page = this.refs.pagePost.state;
    PageActions.savePage(page);
  }

  render() {
    return (
      <DocumentTitle title="Moskfy | Nova páginas">
      <div>
        <AppHeader parentView="Páginas" currentlyView="Nova página"/>

        <PagePost ref="pagePost" title={this.state.title} content={this.state.content} />

        <div style={{textAlign:'right', paddingTop:'50px'}}>
        <RaisedButton label="Salvar" secondary={true} onTouchTap={this.handleSave} />
      </div>

      <Snackbar ref="snack" onDismiss={this.teste} autoHideDuration={1000} message="Página salva com sucesso" />

      </div>
      </DocumentTitle>
    );
  }
}

PagesNew.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
};

export
default PagesNew;
