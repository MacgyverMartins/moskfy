var React = require('react');
var ReactDOM = require('react-dom');
var createBrowserHistory = require('history/lib/createBrowserHistory');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
//var Router = require('react-router');
//var Route = Router.Route;

var Layout = require('./components/layout');
var Home = require('./components/home');

exports.start = function() {
  ReactDOM.render((
    <Router history={createBrowserHistory()}>
      <Route path="/" component={Layout}>
        <Route path="teste" component={Home} />
      </Route>
    </Router>
  ),  document.getElementById('content'))
}
