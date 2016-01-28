'use strict';
import React from 'react';
import FormText from './form-text';
import FormGroups from './form-groups';
import FormTagEdit from './form-tag-edit'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import FlatButton from 'material-ui/lib/flat-button';

import styles from 'material-ui/lib/styles';
const colors = styles.Colors;

import _ from 'lodash';

class FormBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsList: this.props.tagsList || [{name: 'nome', type: 'text'}],
      showEdit: true
    };

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeField =  _.debounce(this.handleChangeField.bind(this),300);
    this.onDelete = this.onDelete.bind(this);
    this.addFieldText = this.addFieldText.bind(this);
    this.addFieldGroup = this.addFieldGroup.bind(this);
    this.showEdit = this.showEdit.bind(this);
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

  showEdit() {
    this.setState({showEdit: !this.state.showEdit});
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
    const floatButtomStyle = {
      margin: '0',
      position: 'absolute',
      bottom: '-22px',
      right: '20px',
      zIndex: '2'
    }
    const listStyle = {
      display: (!this.state.showEdit) ? 'block' : 'none',
      height: '400px',
      overflow: 'scroll'
    }
    const editStyle = {
      display: (this.state.showEdit) ? 'block' : 'none',
      height: '400px',
      overflow: 'scroll'
    }
    const paperStyle = {
      width: '40%',
      height: '400px',
      position: 'relative',
      border: '1px solid #DADADA',
      margin: '5px',
      borderRadius: '3px',
    }

    //let fields = this.state.inputFields.map(function(item, i) {
      //let uniqueId;
      //switch(item.type){
        //case 'text':
        //case 'number':
        //case 'email':
          //uniqueId = item.uniqueId || _.uniqueId('text_');
          //return (
            //<FormText {...item} index={i} key={uniqueId} uniqueId={uniqueId}
            //onChange={this.handleChangeField} onDelete={this.onDelete}/>
            //)
          //break;
        //case 'checkbox':
        //case 'radio':
          //uniqueId = item.uniqueId || _.uniqueId('group_');
          //return (
            //<FormGroups {...item} index={i} key={uniqueId} uniqueId={uniqueId}
            //onChange={this.handleChangeField} onDelete={this.onDelete}/>
          //)
          //break;
      //}
    //}, this);

    let tagsList = this.state.tagsList.map(function(item, i) {
      let uniqueId;
      uniqueId = item.uniqueId || _.uniqueId('tag_');
      return (
        <div key={uniqueId} uniqueId={uniqueId}>
          <ListItem
            primaryText={item.name}
            secondaryText={'input type: ' + item.type} />
          <Divider />
        </div>
        )
    }, this);

    return (
      <Paper style={paperStyle} zDepth={1}>
        <div style={listStyle}>
          <List subheader="General">
          {tagsList}
          </List>
        </div>
        <div style={editStyle}>
          <FormTagEdit />
        </div>
        <FloatingActionButton style={floatButtomStyle} onTouchTap={this.showEdit}>
          <ContentAdd />
        </FloatingActionButton>
      </Paper>
    );
  }
}

export default FormBody;
        //{(_.isEmpty(fields)) ? <p style={noItemsStyle}>no items added</p> : fields}

