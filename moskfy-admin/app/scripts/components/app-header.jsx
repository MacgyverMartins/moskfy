var React = require('react');

var AppHeader = React.createClass({
  propTypes: {
    parentView: React.PropTypes.string,
    currentlyView: React.PropTypes.string
  },

  render: function() {
    var mainHeader_style = {
      header: {
        color: '#000',
        fontWeight: '400'
      },
      span: {
        color: '#5D5D5D',
        fontSize: '1.3rem',
        fontWeight: '300'
      }
    };

    return (
      <div className="app_header">
        <h1 style={ mainHeader_style.header }>
          {this.props.parentView}<span style={ mainHeader_style.span }> - {this.props.currentlyView}</span>
        </h1>
      </div>
    );
  }
});

module.exports = AppHeader;
