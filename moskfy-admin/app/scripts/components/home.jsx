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

var AppHeader = require('./app-header');
var PageNew = require('./pages/page-new');


var Home = React.createClass({
  render: function() {

    var main_style = {
      margin: '56px 0 0 256px',
      padding: '20px'
    };

    return (
      <div className="main_home" style={ main_style }>
        <AppHeader />
        <PageNew />
      </div>
    );
  }
});

module.exports = Home;
