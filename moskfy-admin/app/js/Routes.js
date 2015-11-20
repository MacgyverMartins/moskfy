'use strict';

import React                       from 'react';
import {Router, Route, IndexRoute, RoutingContext} from 'react-router';
import CreateBrowserHistory        from 'history/lib/createBrowserHistory';

import App                         from './App';

import HomePage                    from './pages/HomePage';
import PagesPage                    from './pages/PagesPage';
import SearchPage                  from './pages/SearchPage';
import NotFoundPage                from './pages/NotFoundPage';

console.log('RoutingContext', RoutingContext);

export default (
  <Router history={CreateBrowserHistory()}>
    <Route path="/" component={App}>

      <IndexRoute component={HomePage} />
      <Route path="/" component={HomePage} />
      <Route path="pages">
        <Route path="page-new" component={PagesPage} />
      </Route>
      <Route path="search" component={SearchPage} />

      <Route path="*" component={NotFoundPage} />

    </Route>
  </Router>
);
