'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header.js';
import PageNew from '../components/page-new.js';

const propTypes = {
  currentUser: React.PropTypes.object
};

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let main_style = {
      margin: '56px 0 0 256px',
      padding: '20px'
    };
    return (
      <DocumentTitle title="Home">
        <div className="main_home" style={ main_style }>
          <AppHeader parentView="Páginas" currentlyView="Nova página"/>
          <PageNew />
        </div>
      </DocumentTitle>
    );
  }

}

HomePage.propTypes = propTypes;

export default HomePage;
