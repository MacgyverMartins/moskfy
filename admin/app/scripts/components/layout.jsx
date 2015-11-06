var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Layout = React.createClass({

  render: function() {

    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }

});

module.exports = Layout;
