'use strict';
import React from 'react';
import FormText from './form-text';
import FormGroupOptions from './form-group-options';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Toggle from 'material-ui/lib/toggle';

import DropDownMenu from 'material-ui/lib/DropDownMenu';
import FlatButton from 'material-ui/lib/flat-button';

import styles from 'material-ui/lib/styles';
const colors = styles.Colors;

import _ from 'lodash';

class FormBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFields: []
    };

    this.handleChangeType = this.handleChangeType.bind(this);
    this.addField = this.addField.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleChangeField =  _.debounce(this.handleChangeField.bind(this),300);
  }

  handleChangeType(e, index, type) {
    this.setState({type});
  }

  handleChangeField(index, item) {
    var arr = this.state.inputFields;
    arr[index] = item;
    this.setState({inputFields: arr});
  }

  addField(e) {
    var arrFields = this.state.inputFields;
    arrFields.push({type: 0, name: 'nome', placeholder: 'seu nome aqui', isRequired: true});
    this.setState({inputFields: arrFields});
  }

  onDelete(index, e) {
    var arrFields = this.state.inputFields.slice();
    arrFields.splice(index, 1);
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

    //let fields = this.state.inputFields.map(function(item, i) {
      //console.log('item', item);

      //return (
        //<FormText {...item} index={i} key={i} onChange={this.handleChangeField} onDelete={this.onDelete}/>
      //);
    //}, this);

    console.log('this.state', this.state.inputFields);

    return (
      <div style={{padding: '0 30px', backgroundColor: '#BBBBBB'}}>
        <Divider />
        {this.state.inputFields.map(function(item, i) {
            return (
              <FormText {...item} index={i} key={i} onChange={this.handleChangeField} onDelete={this.onDelete}/>
            );
        }, this)}
        <div style={{margin: '0 0 0'}}>
          <FlatButton label="add"
            onTouchTap={this.addField}
            style={{fontWeight: '600', color: colors.cyan500}} />
        </div>
      </div>
    );
  }
}

export default FormBody;
