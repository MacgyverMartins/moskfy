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
  name: ''
}

class FormsNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = resetState;

    this.handleSave = this.handleSave.bind(this);
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
    if (event.payload === 'onSave' || event.payload === 'onGet') {
      this.setState(event.data);
    }
  }

  handleSave() {
    let form = this.refs.form;
    let body = form.refs.formBody;
    let obj = {
      body: []
    };
    _.assignIn(obj, form.state);
    obj.body = body.state.inputFields;

    FormActions.save(obj);
  }

  render() {
    console.log('form page state', this.state);
    return (
      <DocumentTitle title="Moskfy | Novo formulário">
      <div>
        <AppHeader parentView="Formulários" currentlyView="Novo formulário"/>

        <Form ref="form" {...this.state}/>

        <div style={{textAlign:'right', paddingTop:'50px'}}>
          <RaisedButton label="Salvar" secondary={true} onTouchTap={this.handleSave} />
        </div>

        <Snackbar ref="snack" autoHideDuration={1000} message="Formulário salvo com sucesso" />

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
