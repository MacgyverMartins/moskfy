'use strict';
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Card from 'material-ui/lib/card/card';
import Divider from 'material-ui/lib/divider';
import Toggle from 'material-ui/lib/toggle';

import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

class FormFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null
    }

    this.handleChangeType = this.handleChangeType.bind(this);
  }

  handleChangeType(e, index, type) {
    this.setState({type});
  }

  render() {
    const cardStyle = {
      margin: '20px',
    };
    const wrapper = {
      display: 'flex'
    };
    const itemStyle = {
      margin: '0 20px'
    };
    const labelStyle = {
      fontSize: '16px'
    };
    return (
      <div>
        <Divider />
        <Table
          selectable={false}
          height={'300px'}>
          <TableHeader enableSelectAll={this.state.enableSelectAll}>
            <TableRow>
              <TableHeaderColumn tooltip='The Name'>Tipo</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Name'>Placeholder</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Status'>Required</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={false}>
            <TableRow selected={true}>
              <TableRowColumn>
                <SelectField
                  value={this.state.type}
                  onChange={this.handleChangeType}
                  style={{width: '150px'}}
                  floatingLabelText='Tipo' >
                  <MenuItem value={0} primaryText="text"/>
                  <MenuItem value={1} primaryText="number"/>
                  <MenuItem value={2} primaryText="checkbox"/>
                  <MenuItem value={3} primaryText="radio"/>
                  <MenuItem value={4} primaryText="email"/>
                  <MenuItem value={5} primaryText="tel"/>
                  <MenuItem value={6} primaryText="file"/>
                </SelectField>
              </TableRowColumn>
              <TableRowColumn>
                <TextField hintText="Nome do campo" underlineStyle={{display: 'none'}}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField hintText="Texto" underlineStyle={{display: 'none'}}/>
              </TableRowColumn>
              <TableRowColumn>
                <Toggle
                  name="required"
                  value="required" />
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default FormFields;
