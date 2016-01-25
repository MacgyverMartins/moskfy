'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header';

import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

const List = require('material-ui/lib/lists/list');
import Divider from 'material-ui/lib/divider';
const ListItem = require('material-ui/lib/lists/list-item');
const Avatar = require('material-ui/lib/avatar');
const FontIcon = require('material-ui/lib/font-icon');
const Paper = require('material-ui/lib/paper');
const Colors = require('material-ui/lib/styles/colors');
import _ from 'lodash';
import ActionLabel from 'material-ui/lib/svg-icons/action/label';

const Icon = <Avatar icon={<ActionLabel/>} />;

class FormsList extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      formsList: []
    };

    this.onChange = this.onChange.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  componentWillMount() {
    FormActions.getList();
  }

  componentDidMount() {
    this.unsubscribe = FormStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChange(event) {
    if (event.payload === 'onGetList') {
      this.setState({ formsList: event.data });
    }
  }

  handleTouch(form) {
    var url = `/admin/forms/${form._id}`;
    this.context.history.pushState(null, url);
  }

  render() {
    let list = this.state.formsList.length;
    return (
      <DocumentTitle title="Moskfy | Forms">
      <div>
      <AppHeader parentView="Forms" currentlyView="all"/>

      <Paper zDepth={1}>
        <List subheader="Forms">
          {this.state.formsList.map(function(form, i){
            return (
              <div key={_.uniqueId('form_')}>
                <ListItem
                  leftAvatar={Icon}
                  primaryText={form.name}
                  onTouchTap={this.handleTouch.bind(this, form)} />
                  { i === list-1 ? '' : <Divider inset={true} /> }
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

FormsList.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
};

export default FormsList;
