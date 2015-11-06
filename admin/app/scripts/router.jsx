var React = require('react');
var ReactDOM = require('react-dom');
var createBrowserHistory = require('history/lib/createBrowserHistory');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;

//var Layout = require('./components/layout');
//var Home = require('./components/home');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

var About = React.createClass({
  render: function () {
    return <h3>About</h3>
  }
})

var Inbox = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

var Message = React.createClass({
  render: function () {
    return <h3>Message {this.props.params.id}</h3>
  }
})

exports.start = function() {
  ReactDOM.render((
    <Router history={createBrowserHistory()}>
      <Route path="/" component={App}>
        <IndexRoute component={About} />
        <Route path="inbox" component={Inbox}>
          <Route path="messages/:id" component={Message} />
        </Route>
      </Route>
    </Router>
  ),  document.getElementById('content'))
}
