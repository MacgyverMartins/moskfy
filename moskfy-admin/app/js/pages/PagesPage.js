'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header.js';
import PagePost from '../components/page-post.js';

import PageStore from '../stores/PageStore';
import PageActions from '../actions/PageActions';

const RaisedButton = require('material-ui/lib/raised-button');
const Snackbar = require('material-ui/lib/snackbar');

const propTypes = {
  currentId: React.PropTypes.string
};

class PagesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: {}
    };

    this.handleSave = this.handleSave.bind(this);
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
        this.setState({ page: event.data });
        break;
      case 'onGetNewPage':
        this.setState({ page: event.data });
        break;
      case 'onPageSave':
        this.refs.snack.show();
        break;
    }
  }

  handleSave(event) {
    let page = this.refs.pagePost.state;
    PageActions.savePage(page);
  }

  render() {
    return (
      <DocumentTitle title="Moskfy | Páginas">
      <div>
        <AppHeader parentView="Páginas" currentlyView="Nova página"/>
        <PagePost ref="pagePost" post={this.state.page}/>

        <div style={{textAlign:'right', paddingTop:'50px'}}>
        <RaisedButton label="Salvar" secondary={true} onTouchTap={this.handleSave} />
      </div>

      <Snackbar ref="snack" autoHideDuration={2000} message="Página salva com sucesso" />

      </div>
      </DocumentTitle>
    );
  }

}

PagesPage.propTypes = propTypes;

PagesPage.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
};

export
default PagesPage;
