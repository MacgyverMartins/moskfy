'use strict';
import React from 'react';
import FormBody from './form-body';
import FormCode from './form-code';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

class FormContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      dist: 0,
      tags: this.props.tags || [],
      code: this.props.code
      //code: '<label>Nome:</label>\n'
        //+'<input type="text" name="contact[name]" placeholder="seu nome">\n'
        //+'<label>E-mail:</label>\n'
        //+'<input type="text" name="contact[email]" placeholder="seu email">\n'
        //+'<button type="submit">enviar</button>\n'
    }

    //this.handleChangeField =  _.debounce(this.handleChangeField.bind(this),300);
    this.handleChangeAction = this.handleChangeAction.bind(this);
    //this.handleName = _.debounce(this.handleName.bind(this), 300);
    this.handleName = this.handleName.bind(this);
    this.updateTags = this.updateTags.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let newState = {}
    let self = this;
    _.forEach(nextProps, function(value, key){
      if (_.has(self.state, key)) {
        newState[key] = value;
      }
    });
    this.setState(newState);
  }

  handleChangeAction(e, index, dist) {
    this.setState({dist});
  }

  handleName(e) {
    this.setState({name: e.target.value});
  }

  updateTags(arrayTags) {
    this.setState({
      tags: arrayTags
    });
  }

  render() {
    const underlineStyle = {
      display: 'none',
    };
    const fieldStyle = {
      fontSize: '25px',
      boxSizing: 'border-box',
      padding: '0 20px',
      margin: '5px 0',
      width: '100%'
    };

    return (
      <div className='form_wrapper'>
        <Paper zDepth={1}>
          <TextField
            hintText="Nome do formulário"
            underlineStyle={underlineStyle}
            value={this.state.name}
            onChange={this.handleName}
            style={fieldStyle} />
            <Divider />

          <div style={{display: 'flex', padding: '10px 0', backgroundColor: 'rgb(218, 218, 218)'}}>
            <div style={{width: '60%'}}>
              <FormCode ref='code' code={this.state.code}/>
            </div>
            <FormBody ref="formBody" tagsList={this.state.tags} onChange={this.updateTags}/>
          </div>
          {(this.state.dist === 1) ?
            <h1>config de email</h1> : ''
          }

          <Divider />

          <DropDownMenu value={this.state.dist} onChange={this.handleChangeAction}>
            <MenuItem value={0} primaryText="Salvar contato"/>
            <MenuItem value={1} primaryText="Enviar email de contato"/>
          </DropDownMenu>
        </Paper>
      </div>
    );
  }
}

export default FormContent;
