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
        if (url === this.context.location.pathname) {
          this.forceUpdate();
        } else {
          this.context.history.pushState(null, url);
        }
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
    let code = this.refs.form.refs.code.state;
    let formObj = {
      _id: this.state._id,
      name: form.name,
      tags: form.tags,
      code: code.code
    };

    FormActions.save(formObj);
  }

  handleDelete() {
    FormActions.delete(this.state._id);
  }

  render() {
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
