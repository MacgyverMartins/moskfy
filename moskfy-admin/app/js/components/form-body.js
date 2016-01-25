'use strict';
import React from 'react';
import FormText from './form-text';
import FormGroups from './form-groups';
import ButtomFormAdd from './buttom-form-add';

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
      inputFields: this.props.inputFields || []
    };

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeField =  _.debounce(this.handleChangeField.bind(this),300);
    this.onDelete = this.onDelete.bind(this);
    this.addFieldText = this.addFieldText.bind(this);
    this.addFieldGroup = this.addFieldGroup.bind(this);
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

  handleChangeType(e, index, type) {
    this.setState({type});
  }

  handleChangeField(index, item) {
    var arr = this.state.inputFields;
    arr[index] = item;
    this.setState({inputFields: arr});
  }

  addFieldText(e) {
    var arrFields = this.state.inputFields;
    let uniqueId = _.uniqueId('text_');
    arrFields.push({type: 'text', name: '', placeholder: '', isRequired: true, uniqueId: uniqueId});
    this.setState({inputFields: arrFields});
  }

  addFieldGroup(e) {
    var arrFields = this.state.inputFields;
    let uniqueId = _.uniqueId('group_');
    arrFields.push({type: 'checkbox', name: '', placeholder: '', isRequired: true, uniqueId: uniqueId});
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
    const noItemsStyle = {
      textAlign:'center',
      fontStyle:'italic',
      margin:0,
      padding:0,
      color: '#666'
    };

    let fields = this.state.inputFields.map(function(item, i) {
      let uniqueId;
      switch(item.type){
        case 'text':
        case 'number':
        case 'email':
          uniqueId = item.uniqueId || _.uniqueId('text_');
          return (
            <FormText {...item} index={i} key={uniqueId} uniqueId={uniqueId}
            onChange={this.handleChangeField} onDelete={this.onDelete}/>
            )
          break;
        case 'checkbox':
        case 'radio':
          uniqueId = item.uniqueId || _.uniqueId('group_');
          return (
            <FormGroups {...item} index={i} key={uniqueId} uniqueId={uniqueId}
            onChange={this.handleChangeField} onDelete={this.onDelete}/>
          )
          break;
      }
    }, this);

    return (
      <div style={{padding: '30px', backgroundColor: '#BBBBBB', position: 'relative'}}>
        <div style={{
          margin: '0',
          position: 'absolute',
          bottom: '-22px',
          right: '20px',
          zIndex: '2',
          }}>
          <ButtomFormAdd onToggleAddInput={this.addFieldText} onToggleAddOptions={this.addFieldGroup}/>
        </div>
        {(_.isEmpty(fields)) ? <p style={noItemsStyle}>no items added</p> : fields}
      </div>
    );
  }
}

export default FormBody;
