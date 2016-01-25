'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header';
import Form from '../components/form';

const RaisedButton = require('material-ui/lib/raised-button');
const Snackbar = require('material-ui/lib/snackbar');
const _ = require('lodash');

import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

const resetState = {
  _id: '',
  name: '',
  open: false
}

class FormsNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = resetState;

    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let paramsId = nextProps.params.id;
    if (paramsId) {
      if (paramsId !== this.props.params.id) {
        return FormActions.get(nextProps.params.id);
      }
    } else {
      this.setState(resetState);
    }
  }

  componentDidMount() {
    this.unsubscribe = FormStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChange(event) {
    switch(event.payload){
      case 'onSave':
      case 'onGet':
        this.setState(event.data);
        break;
      case 'onDelete':
        var url = '/admin/forms/all';
        this.context.history.pushState(null, url);
        break;
    }
  }

  handleSave() {
    let formObj = {
      _id: this.state._id,
      body: []
    };

    let form = this.refs.form;
    let body = form.refs.formBody;

    _.assignIn(formObj, form.state);
    formObj.body = body.state.inputFields;
    FormActions.save(formObj);
  }

  handleDelete() {
    FormActions.delete(this.state._id);
  }

  render() {
    console.log('form state', this.state);
    return (
      <DocumentTitle title="Moskfy | Novo formulário">
      <div>
        <AppHeader parentView="Formulários" currentlyView={this.state.name || "Novo formulário"}/>

        <Form ref="form" {...this.state}/>

        <div style={{textAlign:'right', paddingTop:'50px'}}>
        {this.props.params.id ?
        <RaisedButton label="Excluir" primary={true} onTouchTap={this.handleDelete}/> : ''}
          <RaisedButton label="Salvar" secondary={true} onTouchTap={this.handleSave} />
        </div>

        <Snackbar ref="snack" open={this.state.open} autoHideDuration={1000} message="Formulário salvo com sucesso" />

      </div>
      </DocumentTitle>
    );
  }
}

FormsNew.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
};

export default FormsNew;
