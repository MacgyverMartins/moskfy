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
const _ = require('lodash');

class PagesNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      template: 'Default',
      templates: [{name: 'Default'}]
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
    this.setState({template: value});
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
        this.refs.snack.show();
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
        template={this.state.template}
        templates={this.state.templates}
        onChangeTitle={this.onChangeTitle}
        onChangeContent={this.onChangeContent}
        onChangeTemplate={this.onChangeTemplate} />

        <Form />
        <div style={{textAlign:'right', paddingTop:'50px'}}>
          <RaisedButton label="Salvar" secondary={true} onTouchTap={this.handleSave} />
        </div>

        <Snackbar ref="snack" onDismiss={this.teste} autoHideDuration={1000} message="Página salva com sucesso" />
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
