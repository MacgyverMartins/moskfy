'use strict';
import React from 'react';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Card from 'material-ui/lib/card/card';
import Toggle from 'material-ui/lib/toggle';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import IconButton from 'material-ui/lib/icon-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';

import styles from 'material-ui/lib/styles';
const colors = styles.Colors;

class FormGroupOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      name: this.props.name,
      text: this.props.text,
      value: this.props.value,
      inputs: []
    };

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChangeType(e, index, type) {
    this.setState({type: type});
  }

  handleName(e) {
    this.setState({name: e.target.value});
  }

  handleText(e) {
    this.setState({text: e.target.value});
  }

  handleValue(e) {
    this.setState({value: e.target.value});
  }

  handleAdd(e) {
    var arr = this.state.inputs;
    arr.push({text: '', value: ''});
    this.setState({inputs: arr});
  }

  render() {
      const wrapperFieldStyle = {
        display: 'inline-block',
        height: '100%',
        boxSizing: 'border-box',
        padding: '0px 19px'
      }
      const typeStyle = {
        display: 'block'
      }
      const itemStyle = {
        display: 'inline-block',
        margin: '1.2%',
        width: '47.6%'
      }

      let items = this.state.inputs.map(function(item, i) {
        return (
          <Paper style={itemStyle} zDepth={1}>
            <div style={wrapperFieldStyle}>
              <TextField
              fullWidth={true}
              floatingLabelText='value'
              hintText="value"
              value={this.state.value}
              onChange={this.handleValue} />
            </div>
            <div style={wrapperFieldStyle}>
              <TextField
              fullWidth={true}
              floatingLabelText='text element'
              hintText='text element'
              value={this.state.text}
              onChange={this.handleText} />
            </div>
          </Paper>
        );
      }, this);

    return (
      <Paper style={{margin: '10px', paddingBottom: '24px'}} zDepth={1}>
        <div style={typeStyle}>
          <div style={wrapperFieldStyle}>
            <DropDownMenu
            value={this.state.type}
            onChange={this.handleChangeType}
            style={{width: '150px'}}>
            <MenuItem value={0} primaryText="checkbox"/>
            <MenuItem value={1} primaryText="radio"/>
            </DropDownMenu>
          </div>
          <div style={wrapperFieldStyle}>
            <TextField
            fullWidth={true}
            floatingLabelText='input name'
            hintText='input name'
            value={this.state.name}
            onChange={this.handleName} />
          </div>
        </div>

        {items}
        <IconButton
          onTouchTap={this.handleAdd}
          tooltip="add item"
          touch={true}
          tooltipPosition="bottom-right">
          <ContentAddCircle/>
        </IconButton>
      </Paper>
    );
  }
}

export default FormGroupOptions;
