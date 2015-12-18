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

class PagesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {}
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = PageStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChange(event) {
    switch (event.payload) {
      case 'onGetPage':
        this.setState(event.data);
        break;
      case 'onPageSave':
        this.setState(event.data);
        this.refs.snack.show();
        break;
      case 'onDeletePage':
        var url = `/pages/all`;
        this.context.history.pushState(null, url);
        break;
    }
  }

  handleDelete(event) {
    PageActions.deletePage(this.state._id);
  }

  handleSave(event) {
    var page = {
      _id: this.state._id
    };
    var post = this.refs.pagePost.state;
    _.assign(page, post);
    PageActions.savePage(page);
  }

  render() {
    console.log('statepage', this.state);
    return (
      <DocumentTitle title="Moskfy | Páginas">
      <div>
        <AppHeader parentView="Páginas" currentlyView="Nova página"/>

        <PagePost ref="pagePost" title={this.state.title} content={this.state.content}/>

        <div style={{textAlign:'right', paddingTop:'50px'}}>
        <RaisedButton label="Primary" primary={true} onTouchTap={this.handleDelete}/>
        <RaisedButton label="Salvar" secondary={true} onTouchTap={this.handleSave} />
      </div>

      <Snackbar ref="snack" autoHideDuration={2000} message="Página salva com sucesso" />

      </div>
      </DocumentTitle>
    );
  }
}

PagesPage.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
};

export
default PagesPage;
