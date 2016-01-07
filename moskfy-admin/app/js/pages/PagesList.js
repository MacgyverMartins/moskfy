'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header';

import PageActions from '../actions/PageActions';
import PagesListStore from '../stores/PagesListStore';

const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');
const Avatar = require('material-ui/lib/avatar');
const FontIcon = require('material-ui/lib/font-icon');
const Paper = require('material-ui/lib/paper');
const Colors = require('material-ui/lib/styles/colors');

const Icon = <Avatar icon={<FontIcon className="material-icons">insert_drive_file</FontIcon>} />;

class PagesList extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      pagesList: []
    };

    this.onChange = this.onChange.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  componentWillMount() {
    PageActions.listPages();
  }

  componentDidMount() {
    this.unsubscribe = PagesListStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChange(data) {
    this.setState({ pagesList: data });
  }

  handleTouch(page) {
    var url = `/admin/pages/${page._id}`;
    this.context.history.pushState(null, url);
  }

  render() {
    let list = this.state.pagesList.length;
    let mac = true;
    return (
      <DocumentTitle title="Moskfy | Páginas">
      <div>
      <AppHeader parentView="Páginas" currentlyView="Todas as páginas"/>

      <Paper zDepth={1}>
        <List subheader="Páginas">
          {this.state.pagesList.map(function(page, i){
            return (
              <div key={page.title + Math.random()}>
                <ListItem
                  leftAvatar={Icon}
                  primaryText={page.title}
                  onTouchTap={this.handleTouch.bind(this, page)} />
                  { i === list-1 ? '' : <ListDivider inset={true} /> }
              </div>
            );
          }, this)}
        </List>
      </Paper>
      </div>
      </DocumentTitle>
    );
  }
}

PagesList.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
};

export default PagesList;
