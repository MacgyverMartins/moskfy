'use strict';

import React from 'react';
import { Link } from 'react-router';
import AppActions from './actions/AppActions';
import AppStore from './stores/AppStore';

import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import DropDownIcon from 'material-ui/lib/drop-down-icon';
import FontIcon from 'material-ui/lib/font-icon';
import LeftNav from 'material-ui/lib/left-nav';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SubheaderMenuItem from 'material-ui/lib/menu/subheader-menu-item';
import LinearProgress from 'material-ui/lib/linear-progress';
import Snackbar from 'material-ui/lib/snackbar';

import styles from 'material-ui/lib/styles';
const colors = styles.Colors;

import loader from './utils/loader.js';

const propTypes = {
  params: React.PropTypes.object,
  query: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ])
};

const menuItems = [{
  route: '/admin',
  text: 'Home'
},{
  route: '/admin/pages/all',
  text: 'All Pages'
}, {
  route: '/admin/pages/page-new',
  text: 'New Page'
},{
  route: '/admin/forms/all',
  text: 'All Forms'
},{
  route: '/admin/forms/new',
  text: 'New Form'
}];

const iconMenuItems = [{
  payload: '1',
  text: 'Download'
}, {
  payload: '2',
  text: 'More Info'
}];

const resetSnackbar = {
  open: false,
  msg: 'some text here'
}

class App extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      loading: false,
      snackbar: resetSnackbar
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._showProgress = this._showProgress.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = AppStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChange(event) {
    switch(event.payload){
      case 'showSnackbar':
        this.setState({snackbar: {open: true, msg: event.msg}});
        break;
    }
  }

  closeSnackbar() {
    this.setState({snackbar: resetSnackbar});
  }

  _showProgress(data) {
    this.setState({loading: data});
  }

  handleSelect(route, e) {
    this.context.history.pushState(null, route);
  }

  _getSelectedIndex() {
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.history.isActive(currentItem.route)) {
        return i;
      }
    }
  }

  render() {
    let main_style = {
      margin: '56px 0 0 256px',
      padding: '20px'
    };
    let toolbarStyle = {
      backgroundColor: colors.cyan500,
      position: 'fixed',
      top: '0',
      zIndex: '11'
    };


    let progressBar;
    if(this.state.loading){
      progressBar = <LinearProgress mode="indeterminate" style={{ position:'fixed', top:'56px', zIndex: '11' }} />;
    }else{
      progressBar = '';
    }

    return (
      <div className="layout-wrapper">
        <Toolbar style={toolbarStyle}>
          <ToolbarGroup key={0} float="left">
            <ToolbarTitle text="Moskfy" style={{ color: '#FFF', fontSize: '25px' }}/>
          </ToolbarGroup>
        </Toolbar>


        <LeftNav style={{ position: 'fixed', top: '56' }}>
            {menuItems.map(function(item, i) {
              return (
                <MenuItem ref={item.text}
                key={item.text}
                onTouchTap={this.handleSelect.bind(this, item.route)}>{item.text}</MenuItem>
              );
            }, this)}
        </LeftNav>



        <div className="main-pages-container" style={ main_style }>
          {this.props.children}
          <Snackbar ref="snack"
          open={this.state.snackbar.open}
          autoHideDuration={1500}
          onRequestClose={this.closeSnackbar}
          message={this.state.snackbar.msg} />
        </div>
      </div>
    );
  }

}

App.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
};

App.propTypes = propTypes;

export default App;
