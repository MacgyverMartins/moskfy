'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header.js';
import PagePost from '../components/page-post.js';

import PageStore from '../stores/PageStore';
import PageActions from '../actions/PageActions';

const RaisedButton = require('material-ui/lib/raised-button');
const Snackbar = require('material-ui/lib/snackbar');

class PagesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSave = this.handleSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.teste = this.teste.bind(this);
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
      case 'onGetNewPage':
        //TODO
        this.state = {};
        this.setState({});
        break;
      case 'onPageSave':
        this.refs.snack.show();
        break;
    }
  }

  handleSave(event) {
    //TODO
    let post = this.refs.pagePost.state;
    this.state.title = 'sobre a peste';
    PageActions.savePage(this.state);
  }

  teste(event) {
    this.setState({title: event.target.value});
  }

  render() {
    return (
      <DocumentTitle title="Moskfy | Páginas">
      <div>
        <AppHeader parentView="Páginas" currentlyView="Nova página"/>

        <PagePost ref="pagePost" title={this.state.title} content={this.state.content} onChangeTitle={this.teste}/>

        <div style={{textAlign:'right', paddingTop:'50px'}}>
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
