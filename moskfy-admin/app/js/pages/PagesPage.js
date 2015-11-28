'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header.js';
import PagePost from '../components/page-post.js';

import PageStore from '../stores/PageStore';
import PageActions from '../actions/PageActions';

const propTypes = {
  currentUser: React.PropTypes.object
};

class PagesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    PageActions.listPages();
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

  render() {
    return (
      <DocumentTitle title="Moskfy | Páginas">
      <div>
        <AppHeader parentView="Páginas" currentlyView="Nova página"/>
        <PagePost />
      </div>
      </DocumentTitle>
    );
  }

}

PagesPage.propTypes = propTypes;

export default PagesPage;
