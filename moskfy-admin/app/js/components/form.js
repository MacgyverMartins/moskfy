'use strict';
import React from 'react';
import FormBody from './form-body';

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
      action: 0
    }

    this.handleChangeAction = this.handleChangeAction.bind(this);
  }

  handleChangeAction(e, index, action) {
    this.setState({action});
  }

  render() {
    console.log(this.state);
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
    const wrapper = {
      margin: '20px'
    };

    return (
      <div style={wrapper}>
        <Paper zDepth={1}>
          <TextField hintText="Nome do formulário" underlineStyle={underlineStyle} style={fieldStyle} />
          <Divider />

          <FormBody />

          {(this.state.action === 1) ?
            <h1>config de email</h1> : ''
          }

          <Divider />

          <DropDownMenu value={this.state.action} onChange={this.handleChangeAction}>
            <MenuItem value={0} primaryText="Salvar contato"/>
            <MenuItem value={1} primaryText="Enviar email de contato"/>
          </DropDownMenu>

        </Paper>
      </div>
    );
  }

}

export default FormContent;
