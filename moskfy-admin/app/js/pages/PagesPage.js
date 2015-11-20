'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header.js';
import PagePost from '../components/page-post.js';

const propTypes = {
  currentUser: React.PropTypes.object
};

class PagesPage extends React.Component {

  constructor(props) {
    super(props);
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
