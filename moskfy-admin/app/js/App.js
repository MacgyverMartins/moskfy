'use strict';

import React              from 'react';

import CurrentUserActions from './actions/CurrentUserActions';
import CurrentUserStore   from './stores/CurrentUserStore';
import Header             from './components/Header';
import Footer             from './components/Footer';


const Ui = require('material-ui');
const RaisedButton = require('material-ui/lib/raised-button');
const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
const ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const DropDownIcon = require('material-ui/lib/drop-down-icon');
const FontIcon = require('material-ui/lib/font-icon');
const LeftNav =  require('material-ui/lib/left-nav');
const MenuItem = require('material-ui/lib/menu/menu-item');


const propTypes = {
  params: React.PropTypes.object,
  query: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ])
};

const menuItems = [
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

const iconMenuItems = [
  { payload: '1', text: 'Download' },
  { payload: '2', text: 'More Info' }
];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };
  }

  //onUserChange(err, user) {
    //if ( err ) {
      //this.setState({ error: err });
    //} else {
      //this.setState({ currentUser: user || {}, error: null });
    //}
  //}

  componentWillMount() {
    console.log('About to mount App');
  }

  componentDidMount() {
    //this.unsubscribe = CurrentUserStore.listen(this.onUserChange);
    //CurrentUserActions.checkLoginStatus();
  }

  componentWillUnmount() {
    //this.unsubscribe();
  }

  renderChildren() {
    return React.cloneElement(this.props.children, {
      params: this.props.params,
      query: this.props.query,
      currentUser: this.state.currentUser
    });
  }

  render() {
    return (
      <div className="layout-wrapper">
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
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

}

App.propTypes = propTypes;

export default App;
