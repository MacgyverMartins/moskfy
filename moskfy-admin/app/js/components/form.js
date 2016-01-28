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
import CodeMirror from 'react-code-mirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/handlebars/handlebars';
import 'codemirror/addon/hint/html-hint';

class FormContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      action: 0,
      //code: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
      code2: '',
      code: '<form action="/contact_form" method="post">'
        +'\n\t<label>Nome:</label>\n'
        +'\t<input type="text" name="contact[name]" placeholder="seu nome">\n'
        +'\t<label>E-mail:</label>\n'
        +'\t<input type="text" name="contact[email]" placeholder="seu email">\n'
        +'\t<button type="submit">enviar</button>\n'
      +'</form>'
    }

    this.handleChangeAction = this.handleChangeAction.bind(this);
    this.handleName = this.handleName.bind(this);
    this.updateCode = this.updateCode.bind(this);
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

  handleChangeAction(e, index, action) {
    this.setState({action});
  }

  handleName(e) {
    this.setState({name: e.target.value});
  }

  updateCode(e) {
    let newCode = e.target.value;
    console.log('newCode', newCode);
    this.setState({
        code: newCode
        }, function() {
          this.setState({code2: newCode})
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
          <CodeMirror
            style= {{width: '60%', margin: '5px', fontSize: '14px', lineHeight: '21px' }}
            mode={{name: "handlebars", base: "text/html"}}
            theme='monokai'
            defaultValue={this.state.code}
            textAreaStyle={{ minHeight: '10em' }}
            lineNumbers={true}
            value={this.state.code}
            onChange={this.updateCode}/>
          <FormBody ref="formBody" inputFields={this.props.body}/>
        </div>
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

