'use strict';
import React from 'react';
import DocumentTitle from 'react-document-title';
import AppHeader from '../components/app-header';
import Form from '../components/form';
const RaisedButton = require('material-ui/lib/raised-button');
const _ = require('lodash');
import AppActions from '../actions/AppActions';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

const resetState = {
  _id: '',
  name: '',
  code: '<!-- your code here -->',
  tags: []
  //tags: [{
    //type: 'text',
    //name: 'Nome',
    //placeholder: 'seu nome',
    //isRequired: false,
    //choices: []
  //},{
    //type: 'email',
    //name: 'Email',
    //placeholder: 'deixe seu email',
    //isRequired: false,
    //choices: []
  //},{
    //type: 'radio',
    //name: 'sexo',
    //placeholder: '',
    //choices: [{
      //text: 'masculino',
      //value: 'homem'
    //}, {
      //text: 'feminino',
      //value: 'mulher'
    //}]
  //}, {
    //type: 'select',
    //name: 'carro',
    //placeholder: '',
    //isRequired: false,
    //choices: [{
      //text: 'camaro',
      //value: 'camaro de rico'
    //}, {
      //text: 'belina',
      //value: 'belina de pobre'
    //}]
  //}]
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
        AppActions.showSnackbar('Saved form');
        let url = `/admin/forms/${event.data._id}`;
        this.context.history.pushState(null, url);
        break;
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
    let form = this.refs.form.state;
    let formObj = {
      _id: this.state._id,
      name: form.name,
      tags: form.tags,
      code: form.code
    };

    //let form = this.refs.form;
    //let body = form.refs.formBody;

    //_.assignIn(formObj, form.state);
    //formObj.body = body.state.inputFields;
    FormActions.save(formObj);
  }

  handleDelete() {
    FormActions.delete(this.state._id);
  }

  render() {
    console.log('formnew state', this.state);
    return (
      <DocumentTitle title="Moskfy | Novo formulário">
      <div>
        <AppHeader parentView="Formulários" currentlyView={this.state.name || "Novo formulário"}/>

        <Form ref="form" {...this.state} />

        <div style={{textAlign:'right', paddingTop:'50px'}}>
        {this.props.params.id ?
        <RaisedButton label="Excluir" onTouchTap={this.handleDelete}/> : ''}
          <RaisedButton label="Salvar" primary={true} onTouchTap={this.handleSave} />
        </div>
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
