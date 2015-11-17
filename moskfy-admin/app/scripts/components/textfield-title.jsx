var React = require('react');

var TextFieldTitle = React.createClass({
  render: function() {
    return (
      <div className="textFieldTitle">
        <input type="text"/>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Name</label>
      </div>
    );
  }
});

module.exports = TextFieldTitle;
