'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header.js';

import PageActions from '../actions/PageActions';
import PagesListStore from '../stores/PagesListStore';

const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');
const Avatar = require('material-ui/lib/avatar');
const FontIcon = require('material-ui/lib/font-icon');
const Paper = require('material-ui/lib/paper');
const Colors = require('material-ui/lib/styles/colors');

const Av = <Avatar icon={<FontIcon className="material-icons">insert_drive_file</FontIcon>} />;

class PagesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagesList: []
    };

    this.onChange = this.onChange.bind(this);
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

  render() {
    let listItems;
    let array = this.state.pagesList.length;

    for (let i=0; i < array; i++) {
      listItems = array[i];
    }

    return (
      <DocumentTitle title="Moskfy | Páginas">
      <div>
        <AppHeader parentView="Páginas" currentlyView="Todas as páginas"/>

      <Paper zDepth={1}>
        <List subheader="Today">
          {this.state.pagesList.map(function(page, i){
            return (
              <div>
                <ListItem
                  leftAvatar={Av}
                  primaryText={page.title} />
                <ListDivider inset={true} />
              </div>
            );
          })}
        </List>
      </Paper>
      </div>
      </DocumentTitle>
    );
  }
}

export default PagesList;
