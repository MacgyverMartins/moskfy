'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header';
import PagePost from '../components/page-post';
import Form from '../components/form';

import PageStore from '../stores/PageStore';
import PageActions from '../actions/PageActions';

const RaisedButton = require('material-ui/lib/raised-button');
const Snackbar = require('material-ui/lib/snackbar');
import NavigationAdd from 'material-ui/lib/svg-icons/navigation/close';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
const _ = require('lodash');

class PagesNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      title: '',
      content: '',
      templateIndex: 0,
      template: 'Default',
      templates: [{name: 'Default'}],
      adds: []
    };

    this.handleSave = this.handleSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeTemplate = this.onChangeTemplate.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = PageStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChangeTemplate(value) {
    this.setState({templateIndex: value});
  }

  onChangeTitle(value) {
    this.setState({title: value});
  }

  onChangeContent(value) {
    this.setState({content: value});
  }

  onChange(event) {
    switch (event.payload) {
      case 'onGetTemplates':
        this.setState({templates: event.data});
        break
      case 'onPageSave':
        this.setState({openSnackbar: true});
        setTimeout(function() {
          var url = `/admin/pages/${event.data._id}`;
          this.context.history.pushState(null, url);
        }.bind(this), 1001);
        break;
    }
  }

  handleSave(event) {
    var page = this.state;
    PageActions.savePage(page);
  }

  render() {
    return (
      <DocumentTitle title="Moskfy | Nova páginas">
      <div>
        <AppHeader parentView="Páginas" currentlyView="Nova página"/>

        <PagePost ref="pagePost"
        title={this.state.title}
        content={this.state.content}
        templateIndex={this.state.templateIndex}
        templates={this.state.templates}
        onChangeTitle={this.onChangeTitle}
        onChangeContent={this.onChangeContent}
        onChangeTemplate={this.onChangeTemplate} />

        <div style={{textAlign:'right', paddingTop:'50px'}}>
          <RaisedButton label="Salvar" secondary={true} onTouchTap={this.handleSave} />
        </div>

        <Snackbar ref="snack"
        autoHideDuration={1000}
        open={this.state.openSnackbar}
        message="Página salva com sucesso" />
      </div>
      </DocumentTitle>
    );
  }
}

PagesNew.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
};

export default PagesNew;
