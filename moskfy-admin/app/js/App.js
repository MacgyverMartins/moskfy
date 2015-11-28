'use strict';

import React from 'react';
import { Link } from 'react-router';

const RaisedButton = require('material-ui/lib/raised-button');
const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
const ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const DropDownIcon = require('material-ui/lib/drop-down-icon');
const FontIcon = require('material-ui/lib/font-icon');
const LeftNav = require('material-ui/lib/left-nav');
const MenuItem = require('material-ui/lib/menu/menu-item');
const LinearProgress = require('material-ui/lib/linear-progress');

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
  route: '/',
  text: 'Home'
},{
  type: MenuItem.Types.SUBHEADER,
  text: 'Páginas'
}, {
  route: '/pages/all-pages',
  text: 'Todas as Páginas'
}, {
  route: '/pages/page-new',
  text: 'Nova Página'
}, {
  type: MenuItem.Types.SUBHEADER,
  text: 'Links úteis'
}, {
  type: MenuItem.Types.LINK,
  payload: 'http://google.com',
  text: 'Manual do Admin'
}, {
  type: MenuItem.Types.LINK,
  payload: 'http://nurimba.com.br',
  text: 'Suporte',
}];

const iconMenuItems = [{
  payload: '1',
  text: 'Download'
}, {
  payload: '2',
  text: 'More Info'
}];

class App extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      loading: false
    };
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._showProgress = this._showProgress.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    loader.on('loading', this._showProgress);
  }

  componentWillUnmount() {
    //this.unsubscribe();
  }

  _showProgress(data) {
    this.setState({loading: data});
  }

  _onLeftNavChange(e, key, payload) {
    this.context.history.pushState(null, payload.route);
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


    let progressBar;
    if(this.state.loading){
      progressBar = <LinearProgress mode="indeterminate" style={{ position:'fixed', top:'56px', zIndex: '11' }} />;
    }else{
      progressBar = '';
    }

    return (
      <div className="layout-wrapper">
        {progressBar}
        <Toolbar style={{ position: 'fixed', top: '0', zIndex: '11' }}>
          <ToolbarGroup key={0} float="left">
            <ToolbarTitle text="Moskfy" />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <ToolbarSeparator/>
            <FontIcon className="material-icons">menu</FontIcon>
            <DropDownIcon iconClassName="material-icons" iconLigature="expand_more" menuItems={iconMenuItems} />
          </ToolbarGroup>
        </Toolbar>

        <LeftNav
          ref="leftNav"
          menuItems={menuItems}
          onChange={this._onLeftNavChange}
          selectedIndex={this._getSelectedIndex()}
          style={{ position: 'fixed', top: '56' }} />

        <div className="main-pages-container" style={ main_style }>
          {this.props.children}
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
