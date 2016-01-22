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
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import _ from 'lodash';

import styles from 'material-ui/lib/styles';
const colors = styles.Colors;

class FormGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: this.props.uniqueId,
      type: this.props.type,
      name: this.props.name,
      inputs: []
    };

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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

  handleName(e) {
    let index = this.props.index;
    this.setState({name: e.target.value}, this.handleChanges);
  }

  handleValue(index, e) {
    var arr = this.state.inputs;
    arr[index].value = e.target.value;
    this.setState({inputs: arr}, this.handleChanges);
  }

  handleText(index, e) {
    var arr = this.state.inputs;
    arr[index].text = e.target.value;
    this.setState({inputs: arr}, this.handleChanges);
  }

  handleAdd(e) {
    var arr = this.state.inputs;
    arr.push({text: '', value: ''});
    this.setState({inputs: arr}, this.handleChanges);
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
        padding: '0px 19px'
      }
      const typeStyle = {
        display: 'block'
      }
      const itemStyle = {
        boxShadow: 'none',
        border: '2px solid #C3C3C3',
        display: 'inline-block',
        margin: '1.2%',
        width: '47.6%'
      }

      let items = this.state.inputs.map(function(item, i) {
        return (
          <Paper key={i} style={itemStyle} zDepth={2}>
            <div className='form-group-options__item__header'></div>
            <div style={wrapperFieldStyle}>
              <TextField
              fullWidth={true}
              floatingLabelText='value'
              hintText="value"
              value={this.state.inputs[i].value}
              onChange={this.handleValue.bind(this, i)} />
            </div>
            <div style={wrapperFieldStyle}>
              <TextField
              fullWidth={true}
              floatingLabelText='text element'
              hintText='text element'
              value={this.state.inputs[i].text}
              onChange={this.handleText.bind(this, i)} />
            </div>
          </Paper>
        );
      }, this);

    return (
      <Paper style={{margin: '10px', paddingBottom: '24px'}} zDepth={1}>
        <IconButton
          style={{float: 'right'}}
          onTouchTap={this.deleteItem.bind(this, this.props.index)}
          tooltip="remove item"
          tooltipPosition="top-left">
          <ContentClear />
        </IconButton>
        <div style={typeStyle}>
          <div style={wrapperFieldStyle}>
            <DropDownMenu
            value={this.state.type}
            onChange={this.handleChangeType}
            style={{width: '150px'}}>
            <MenuItem value='checkbox' primaryText="checkbox"/>
            <MenuItem value='radio' primaryText="radio"/>
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
          tooltip="add input"
          tooltipPosition="bottom-right">
          <ContentAddCircle color={colors.pink200}/>
        </IconButton>
      </Paper>
    );
  }
}

export default FormGroups;
