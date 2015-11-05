var React = require('react');

var Home = React.createClass({

  render: function() {
    return (
      <div className="hero-unit">
        <h2>Bem-vindo ao Moskfy</h2>
        <p>esse é o admin</p>
        <ul>
            <li>ReactJS Reflux Boilerplate</li>
            <li>Jest</li>
        </ul>
      </div>
    );
  }

});

module.exports = Home;
