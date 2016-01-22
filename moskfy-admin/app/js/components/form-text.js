'use strict';
import React from 'react';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Card from 'material-ui/lib/card/card';
import Toggle from 'material-ui/lib/toggle';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import _ from 'lodash';

import styles from 'material-ui/lib/styles';
const colors = styles.Colors;

class FormText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: this.props.uniqueId,
      type: this.props.type,
      name: this.props.name,
      placeholder: this.props.placeholder,
      label: this.props.label,
      isRequired: this.props.isRequired
    };

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePlaceholder = this.handlePlaceholder.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
    this.handleRequired = this.handleRequired.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let newState = {}
    _.forEach(nextProps, function(value, key){
      if (this.state[key]) {
        newState[key] = value;
      }
    }, this);
    this.setState(newState);
  }

  handleChanges() {
    let index = this.props.index;
    if (this.props.onChange) {
      return this.props.onChange(index, this.state);
    }
  }

  handleChangeType(e, index, type) {
    this.setState({type: type}, this.handleChanges);
  }

  handleRequired(event, toggled) {
    this.setState({isRequired: toggled}, this.handleChanges);
  }

  handleName(e) {
    let index = this.props.index;
    this.setState({name: e.target.value}, this.handleChanges);
  }

  handlePlaceholder(e) {
    this.setState({placeholder: e.target.value}, this.handleChanges);
  }

  handleLabel(e) {
    this.setState({label: e.target.value}, this.handleChanges);
  }

  deleteItem(index, e) {
    if (this.props.onDelete) {
      return this.props.onDelete(index, e);
    }
  }

  render() {
      const wrapperFieldStyle = {
        display: 'inline-block',
        height: '100%',
        boxSizing: 'border-box',
        padding: '10px 20px 25px',
        width: '25%'
      }
    return (
      <Paper style={{margin: '10px', paddingBottom: '24px'}} zDepth={1}>
        <IconButton
          style={{float: 'right'}}
          onTouchTap={this.deleteItem.bind(this, this.props.index)}
          tooltip="remove item"
          tooltipPosition="top-left">
          <ContentClear />
        </IconButton>
        <div style={wrapperFieldStyle}>
          <DropDownMenu
          value={this.state.type}
          onChange={this.handleChangeType}
          style={{width: '150px'}}>
          <MenuItem value='text' primaryText="text"/>
          <MenuItem value='number' primaryText="number"/>
          <MenuItem value='email' primaryText="email"/>
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
          floatingLabelText='placeholder (optional)'
          hintText="placeholder (optional)"
          value={this.state.placeholder}
          onChange={this.handlePlaceholder}
          />
        </div>
        <div style={wrapperFieldStyle}>
          <TextField
          fullWidth={true}
          floatingLabelText='label (optional)'
          hintText="label (optional)"
          value={this.state.label}
          onChange={this.handleLabel}
          />
        </div>
        <div style={wrapperFieldStyle} >
          <Toggle
            label='is required'
            style={{width: 'auto', margin: '0 auto -7px'}}
            name="required"
            defaultToggled={this.state.isRequired}
            onToggle={this.handleRequired}
            value="required" />
        </div>
      </Paper>
    );
  }
}

export default FormText;

