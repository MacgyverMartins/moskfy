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
      dist: 0,
      tags: this.props.tags || [],

      codeExample: '<form action="/contact_form" method="post">',
      codeExampleEnd: '</form>',
      code: this.props.code,
      //code: '<label>Nome:</label>\n'
        //+'<input type="text" name="contact[name]" placeholder="seu nome">\n'
        //+'<label>E-mail:</label>\n'
        //+'<input type="text" name="contact[email]" placeholder="seu email">\n'
        //+'<button type="submit">enviar</button>\n'
    }

    //this.handleChangeField =  _.debounce(this.handleChangeField.bind(this),300);
    this.handleChangeAction = this.handleChangeAction.bind(this);
    this.handleName = _.debounce(this.handleName.bind(this), 300);
    this.updateCode =  this.updateCode.bind(this);
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

  updateCode(e) {
    let newCode = e.target.value;
    this.setState({
      code: newCode
    });
  }

  updateTags(arrayTags) {
    console.log('arrayTags');
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
    const codeExampleStyle = {
      background: 'rgb(60, 60, 60)',
      fontFamily: 'monospace',
      padding: '16px 13px',
      color: '#ADADAD',
      fontSize: '16px',
      borderTopRightRadius: '3px'
    }
    const codeExampleEndStyle = {
      background: 'rgb(60, 60, 60)',
      fontFamily: 'monospace',
      padding: '16px 13px',
      color: '#ADADAD',
      fontSize: '16px',
      borderBottomRightRadius: '3px'
    }

    console.log('form state', this.state.tags);
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
              <div style={codeExampleStyle}>{this.state.codeExample}</div>
              <CodeMirror
                ref='formCode'
                style= {{fontSize: '14px', lineHeight: '21px' }}
                mode={{name: "handlebars", base: "text/html"}}
                theme='monokai'
                defaultValue={this.state.code}
                textAreaStyle={{ minHeight: '10em' }}
                lineNumbers={true}
                value={this.state.code}
                onChange={this.updateCode}/>
              <div style={codeExampleEndStyle}>{this.state.codeExampleEnd}</div>
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
