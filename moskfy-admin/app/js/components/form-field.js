'use strict';
import React from 'react';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Card from 'material-ui/lib/card/card';
import Toggle from 'material-ui/lib/toggle';

import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

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
  }

  render() {
    return (
      <TableRow selected={true} style={{backgroundColor: '#FFF'}}>
        <TableRowColumn style={{backgroundColor: '#FFF'}}>
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
        </TableRowColumn>
        <TableRowColumn style={{backgroundColor: '#FFF'}}>
          <TextField
            hintText="Nome do campo"
            value={this.state.name}
            onChange={this.handleName}
            underlineStyle={{display: 'none'}}/>
        </TableRowColumn>
        <TableRowColumn style={{backgroundColor: '#FFF'}}>
          <TextField
            hintText="Texto"
            value={this.state.placeholder}
            onChange={this.handlePlaceholder}
            underlineStyle={{display: 'none'}}/>
        </TableRowColumn>
        <TableRowColumn style={{backgroundColor: '#FFF'}}>
          <Toggle
            name="required"
            defaultToggled={this.state.required}
            value="required" />
        </TableRowColumn>
      </TableRow>
    );
  }
}

export default FormFields;
