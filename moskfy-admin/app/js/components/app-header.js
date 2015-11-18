'use strict';

import React from 'react';

class AppHeader extends React.Component {

  render() {
    let mainHeader_style = {
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

}

export default AppHeader;
