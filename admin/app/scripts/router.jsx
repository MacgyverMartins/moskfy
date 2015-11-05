var React = require('react');
var Router = require('react-router');
var ReactDOM = require('react-dom');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Layout = require('./components/layout');
var Home = require('./components/home');

var routes = (
	<Route name="layout" path="/" handler={Layout}>
		<DefaultRoute handler={Home} />
	</Route>
);

exports.start = function() {

  Router.run(routes, function (Handler) {
		ReactDOM.render(<Handler />, document.getElementById('content'));
	});
}
