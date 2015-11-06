'use strict';
var React = require('react');
var Ui = require('material-ui');
var RaisedButton = Ui.RaisedButton;
var Toolbar = Ui.Toolbar;
var ToolbarGroup = Ui.ToolbarGroup;
var ToolbarTitle = Ui.ToolbarTitle;
var ToolbarSeparator = Ui.ToolbarSeparator;
var DropDownMenu = Ui.DropDownMenu;
var DropDownIcon = Ui.DropDownIcon;
var FontIcon = Ui.FontIcon;
var RaisedButton = Ui.RaisedButton;
var LeftNav = Ui.LeftNav;
var MenuItem = Ui.MenuItem;


var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var iconMenuItems = [{
  payload: '1',
  text: 'Download'
}, {
  payload: '2',
  text: 'More Info'
}];


var menuItems = [
  { type: MenuItem.Types.SUBHEADER, text: 'Páginas' },
  { route: 'home', text: 'Home' },
  { type: MenuItem.Types.SUBHEADER, text: 'Links úteis' },
  {
     type: MenuItem.Types.LINK,
     payload: 'http://google.com',
     text: 'Manual do Admin'
  },
  {
     type: MenuItem.Types.LINK,
     payload: 'http://nurimba.com.br',
     text: 'Suporte',
  }
];

var Home = React.createClass({
  render: function() {
    return (
      <div className="main">
        <Toolbar style={{ position: 'fixed', top: '0' }}>
          <ToolbarGroup key={0} float="left">
            <ToolbarTitle text="Moskfy" />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <ToolbarSeparator/>
            <FontIcon className="material-icons">menu</FontIcon>
            <DropDownIcon iconClassName="material-icons" iconLigature="expand_more" menuItems={iconMenuItems} />
          </ToolbarGroup>
        </Toolbar>

        <LeftNav ref="leftNav" menuItems={menuItems} style={{ position: 'fixed', top: '56' }} />
      </div>
    );
  }
});

module.exports = Home;
