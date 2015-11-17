var React = require('react');
var ReactDOM = require('react-dom');
var createBrowserHistory = require('history/lib/createBrowserHistory');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;

var Layout = require('./components/layout');
var Home = require('./components/home');

exports.start = function() {
  ReactDOM.render((
    <Router history={createBrowserHistory()}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  ),  document.getElementById('content'))
}
