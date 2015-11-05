var React = require('react');

var Home = React.createClass({

  render: function() {
    return (
      <div className="hero-unit">
        <h1>'Allo, 'Allo! I'm Macgyver</h1>
        <p>You now have</p>
        <ul>
            <li>ReactJS Reflux Boilerplate</li>
            <li>Jest</li>
        </ul>
      </div>
    );
  }

});

module.exports = Home;
