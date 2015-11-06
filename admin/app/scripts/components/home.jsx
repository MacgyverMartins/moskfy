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

var filterOptions = [{
  payload: '1',
  text: 'All Broadcasts'
}, {
  payload: '2',
  text: 'All Voice'
}, {
  payload: '3',
  text: 'All Text'
}, {
  payload: '4',
  text: 'Complete Voice'
}, {
  payload: '5',
  text: 'Complete Text'
}, {
  payload: '6',
  text: 'Active Voice'
}, {
  payload: '7',
  text: 'Active Text'
}, ];
var iconMenuItems = [{
  payload: '1',
  text: 'Download'
}, {
  payload: '2',
  text: 'More Info'
}];

var Home = React.createClass({
  render: function() {
    return (
      <div className="mk_toolbar">
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <DropDownMenu menuItems={filterOptions} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <ToolbarTitle text="Options" />
            <FontIcon className="material-icons">menu</FontIcon>
            <DropDownIcon iconClassName="material-icons" iconLigature="expand_more" menuItems={iconMenuItems} />
            <ToolbarSeparator/>
            <RaisedButton label="Create Broadcast" primary={true} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
});

module.exports = Home;
