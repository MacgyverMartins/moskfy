'use strict';

import React from 'react';
import {Router, Route, IndexRoute, RoutingContext, Redirect} from 'react-router';
import CreateBrowserHistory        from 'history/lib/createBrowserHistory';

import App from './App';
import HomePage from './pages/HomePage';
import PagesPage from './pages/PagesPage';
import PagesNew from './pages/PagesNew';
import PagesList from './pages/PagesList';
import FormsNew from './pages/FormsNew';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

import PageActions from './actions/PageActions';

export default (
  <Router history={CreateBrowserHistory()}>
    <Route path="/admin" component={App}>

      //<IndexRoute component={HomePage} />
      //<Route path="/" component={HomePage} />

      <Redirect from="pages" to="pages/all" />
      <Route path="pages">
        <Route path="all" component={PagesList} />
        <Route path="page-new" component={PagesNew} />
        <Route path=":id" component={PagesPage} onEnter={PageActions.getPage} />
      </Route>

      <Route path="forms">
        <Route path="all" component={FormsNew} />
        <Route path="new" component={FormsNew} />
        <Route path=":id" component={FormsNew} />
      </Route>

      <Route path="*" component={NotFoundPage} />

    </Route>
  </Router>
);
