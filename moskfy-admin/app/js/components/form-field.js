'use strict';
import React from 'react';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Card from 'material-ui/lib/card/card';
import Toggle from 'material-ui/lib/toggle';

import DropDownMenu from 'material-ui/lib/DropDownMenu';
import FlatButton from 'material-ui/lib/flat-button';

import styles from 'material-ui/lib/styles';
const colors = styles.Colors;

class FormFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      name: this.props.name,
      placeholder: this.props.placeholder,
      required: this.props.required
    };

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePlaceholder = this.handlePlaceholder.bind(this);
  }

  handleChangeType(e, index, type) {
    this.setState({type: type});
  }

  handleName(e) {
    this.setState({name: e.target.value});
  }

  handlePlaceholder(e) {
    this.setState({placeholder: e.target.value});
    this.emitChanges()
  }

  render() {
      const wrapperFieldStyle = {
        display: 'inline-block',
        height: '100%',
        boxSizing: 'border-box',
        padding: '0px 19px',
        width: '25%'
      }
    return (
      <Paper style={{margin: '10px', paddingBottom: '24px'}} zDepth={1}>
        <div style={wrapperFieldStyle}>
          <DropDownMenu
          value={this.state.type}
          onChange={this.handleChangeType}
          style={{width: '150px'}}>
          <MenuItem value={0} primaryText="text"/>
          <MenuItem value={1} primaryText="number"/>
          <MenuItem value={2} primaryText="checkbox"/>
          <MenuItem value={3} primaryText="radio"/>
          <MenuItem value={4} primaryText="email"/>
          <MenuItem value={5} primaryText="tel"/>
          <MenuItem value={6} primaryText="file"/>
          </DropDownMenu>
        </div>
        <div style={wrapperFieldStyle}>
          <TextField
          fullWidth={true}
          floatingLabelText='input name'
          hintText='input name'
          value={this.state.name}
          onChange={this.handleName}
          />
        </div>
        <div style={wrapperFieldStyle}>
          <TextField
          fullWidth={true}
          floatingLabelText='placeholder'
          hintText="placeholder"
          value={this.state.placeholder}
          onChange={this.handlePlaceholder}
          />
        </div>
        <div style={wrapperFieldStyle} >
          <Toggle
            label='is required'
            style={{width: 'auto', margin: '0 auto -7px'}}
            name="required"
            defaultToggled={this.state.required}
            value="required" />
        </div>
      </Paper>
    );
  }
}

export default FormFields;
