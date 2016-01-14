'use strict';
import React from 'react';
import FormField from './form-field';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
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

class FormBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFields: []
    };

    this.handleChangeType = this.handleChangeType.bind(this);
    this.addField = this.addField.bind(this);
  }

  handleChangeType(e, index, type) {
    this.setState({type});
  }

  addField(e) {
    var arrFields = this.state.inputFields;
    arrFields.push({type: 0, name: 'nome', placeholder: 'seu nome aqui', required: true});
    this.setState({inputFields: arrFields});
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

    let fields = this.state.inputFields.map(function(item, i) {
      return (
        <FormField {...item}/>
      );
    });

    return (
      <div style={{margin: '0 30px'}}>
        <div style={{margin: '20px 0 0'}}>
          <FlatButton label="add"
            onTouchTap={this.addField}
            style={{fontWeight: '600', color: colors.cyan500}} />
          <FlatButton label="remove"
            style={{fontWeight: '600', color: colors.cyan500}} />
        </div>
        <Divider />
        <Table selectable={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip='The Name'>Tipo</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Name'>Placeholder</TableHeaderColumn>
              <TableHeaderColumn tooltip='The Status'>Required</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={false}>
            {fields}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default FormBody;
