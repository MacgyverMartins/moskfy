'use strict';

import React from 'react';
import {Router, Route, IndexRoute, RoutingContext} from 'react-router';
import CreateBrowserHistory        from 'history/lib/createBrowserHistory';

import App from './App';
import HomePage from './pages/HomePage';
import PagesPage from './pages/PagesPage';
import PagesNew from './pages/PagesNew';
import PagesList from './pages/PagesList';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

import PageActions from './actions/PageActions';


export default (
  <Router history={CreateBrowserHistory()}>
    <Route path="/" component={App}>

      <IndexRoute component={HomePage} />
      <Route path="/" component={HomePage} />
      <Route path="pages">
        <Route path="all" component={PagesList} />
        <Route path="page-new" component={PagesNew} onEnter={PageActions.getNewPage} />
        <Route path=":id" component={PagesPage} onEnter={PageActions.getPage} />
      </Route>
      <Route path="search" component={SearchPage} />

      <Route path="*" component={NotFoundPage} />

    </Route>
  </Router>
);
