var React = require('react');

var AppHeader = React.createClass({

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
          Páginas<span style={ mainHeader_style.span }> - Nova página</span>
        </h1>
      </div>
    );
  }

});

module.exports = AppHeader;
