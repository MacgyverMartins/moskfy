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
import _ from 'lodash';
import styles from 'material-ui/lib/styles';
const colors = styles.Colors;

class FormBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsList: this.props.tagsList || [],
      currentTag: {},
      showEditor: false
    };

    //this.handleChangeField =  _.debounce(this.handleChangeField.bind(this),300);
    this.onDelete = this.onDelete.bind(this);
    this.addNewTag = this.addNewTag.bind(this);
    this.openTagEditor = this.openTagEditor.bind(this);
    this.cancelEditor = this.cancelEditor.bind(this);
    this.saveEditor = this.saveEditor.bind(this);
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

  addNewTag(e) {
    this.setState({
      currentTag: {},
      currentTagIndex: null,
      showEditor: true
    });
  }

  onDelete(index, e) {
    var arrFields = this.state.inputFields.slice();
    arrFields.splice(index, 1);
    this.setState({inputFields: arrFields});
  }

  openTagEditor(index, e) {
    let tagsList = this.state.tagsList;
    this.setState({
      currentTag: tagsList[index],
      currentTagIndex: index,
      showEditor: true
    });
  }

  cancelEditor(e) {
    this.setState({
      currentTag: {},
      currentTagIndex: null,
      showEditor: false
    });
  }

  saveEditor(index, item)  {
    let tagsList = this.state.tagsList;
    if (index) {
      tagsList[index] = item;
    } else {
      tagsList.push(item);
    }
    this.setState({
      tagsList: tagsList
    }, this.cancelEditor());
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
      display: (!this.state.showEditor) ? 'block' : 'none',
      height: '400px',
      overflow: 'scroll'
    }
    const editStyle = {
      display: (this.state.showEditor) ? 'block' : 'none',
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

    let tagsList = this.state.tagsList.map(function(item, i) {
      let uniqueId;
      uniqueId = item.uniqueId || _.uniqueId('tag_');
      return (
        <div key={uniqueId} uniqueId={uniqueId}>
          <ListItem
            onTouchTap={this.openTagEditor.bind(this, i)}
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
          <FormTagEdit {...this.state.currentTag}
            index={this.state.currentTagIndex}
            onSave={this.saveEditor}
            onCancel={this.cancelEditor}
          />
        </div>
        {(this.state.showEditor === false) ?
          <FloatingActionButton style={floatButtomStyle} onTouchTap={this.addNewTag}>
            <ContentAdd />
          </FloatingActionButton>
          : ''}
      </Paper>
    );
  }
}

export default FormBody;
        //{(_.isEmpty(fields)) ? <p style={noItemsStyle}>no items added</p> : fields}

