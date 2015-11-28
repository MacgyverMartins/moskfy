'use strict';

import React         from 'react';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header.js';
import PagePost from '../components/page-post.js';

import PageStore from '../stores/PageStore';
import PageActions from '../actions/PageActions';

const RaisedButton = require('material-ui/lib/raised-button');
const Snackbar = require('material-ui/lib/snackbar');

//const propTypes = {
  //currentUser: React.PropTypes.object
//};

class PagesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: {}
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

  onChange(data) {
    this.setState({ currentPage: data });
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
        <PagePost ref="pagePost" />

        <div style={{textAlign:'right', paddingTop:'50px'}}>
        <RaisedButton label="Salvar" secondary={true} onTouchTap={this.handleSave} />
      </div>
      </div>
      </DocumentTitle>
    );
  }

}

//PagesPage.propTypes = propTypes;

export default PagesPage;
