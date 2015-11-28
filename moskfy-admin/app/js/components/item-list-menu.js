'use strict';

import React from 'react';

const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const Colors = require('material-ui/lib/styles/colors');
const IconButton = require('material-ui/lib/icon-button');

const iconButtonElement = <IconButton className="material-icons" style={{padding: '12px', color: Colors.grey400}}>chat_bubble</IconButton>;

class ItemListMenu extends React.Component {
  render() {
    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }
}

export default ItemListMenu;
