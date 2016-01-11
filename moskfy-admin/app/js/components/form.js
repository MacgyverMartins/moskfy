'use strict';
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

class FormContent extends React.Component {

  render() {
    const iconStyles = {
      marginRight: 24,
    };
    const wrapper = {
      margin: '20px'
    };
    return (
      <div style={wrapper}>
        <AppBar
          title="Formulário"
          titleStyle={{margin: '90px'}}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}} >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          } />
      </div>
    );
  }

}

export default FormContent;
