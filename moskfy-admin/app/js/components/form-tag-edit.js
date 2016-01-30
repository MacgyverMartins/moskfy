'use strict';
import React from 'react';

import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import _ from 'lodash';

import styles from 'material-ui/lib/styles';
const colors = styles.Colors;

class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: this.props.uniqueId,
      name: this.props.name,
      placeholder: this.props.placeholder,
      label: this.props.label,
      isRequired: this.props.isRequired || false
    };

    this.handleFields = this.handleFields.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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

  handleFields(field, e) {
    this.setState({[field]: e.target.value});
  }

  handleToggle(e, isRequired) {
    this.setState({isRequired});
  }

  render() {
    return (
      <div>
        <TextField
          value={this.state.name}
          floatingLabelText="name*"
          onChange={this.handleFields.bind(this, 'name')}
          fullWidth={true}
        />
        <TextField
          value={this.state.placeholder}
          floatingLabelText='placeholder (optional)'
          onChange={this.handleFields.bind(this, 'placeholder')}
          fullWidth={true}
        />
        <TextField
          value={this.state.label}
          floatingLabelText='label (optional)'
          hintText="label (optional)"
          onChange={this.handleFields.bind(this, 'label')}
          fullWidth={true}
        />
        <Toggle
          label='is required'
          style={{width: 'auto', margin: '0 auto -7px'}}
          name="required"
          defaultToggled={this.state.isRequired}
          onToggle={this.handleToggle}
          value="required"
        />
      </div>
    );
  }
}

class InputCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: this.props.uniqueId,
      name: this.props.name,
      label: this.props.label,
      isRequired: this.props.isRequired
    };
  }

  render() {
    return (
      <div>
      sou um checkbox
      </div>
    );
  }
}

class InputRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: this.props.uniqueId,
      name: this.props.name,
      choices: this.props.choices || []
    };

    this.handleName = this.handleName.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleName(e) {
    let index = this.props.index;
    this.setState({name: e.target.value});
  }

  handleValue(index, e) {
    var arr = this.state.choices;
    arr[index].value = e.target.value;
    this.setState({choices: arr});
  }

  handleText(index, e) {
    var arr = this.state.choices;
    arr[index].text = e.target.value;
    this.setState({choices: arr});
  }

  handleAdd(e) {
    var arr = this.state.choices;
    arr.push({text: '', value: ''});
    this.setState({choices: arr});
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
        margin: '0 5px',
        width: '150px'
      }
      const itemStyle = {
        boxShadow: 'none',
        border: '2px solid #C3C3C3',
        display: 'block',
        overflow: 'hidden',
        marginTop: '5px'
      }

      let items = this.state.choices.map(function(item, i) {
        return (
          <Paper key={i} style={itemStyle} zDepth={2}>
            <div className='form-group-options__item__header'></div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={wrapperFieldStyle}>
                <TextField
                  fullWidth={true}
                  floatingLabelText='value'
                  hintText="value"
                  value={this.state.choices[i].value}
                  onChange={this.handleValue.bind(this, i)}
                />
              </div>
              <div style={wrapperFieldStyle}>
                <TextField
                  fullWidth={true}
                  floatingLabelText='text element'
                  hintText='text element'
                  value={this.state.choices[i].text}
                  onChange={this.handleText.bind(this, i)}
                />
              </div>
            </div>
          </Paper>
        );
      }, this);

    return (
      <div>
        <TextField
          value={this.state.name}
          floatingLabelText='input name'
          onChange={this.handleName}
          fullWidth={true}
        />

        {items}
        <IconButton
          onTouchTap={this.handleAdd}
          tooltip="add input"
          tooltipPosition="bottom-right">
          <ContentAddCircle color={colors.pink200}/>
        </IconButton>
      </div>
    );
  }
}

class InputSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: this.props.uniqueId,
      name: this.props.name,
      choices: this.props.choices || []
    };

    this.handleName = this.handleName.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleName(e) {
    let index = this.props.index;
    this.setState({name: e.target.value});
  }

  handleValue(index, e) {
    var arr = this.state.choices;
    arr[index].value = e.target.value;
    this.setState({choices: arr});
  }

  handleText(index, e) {
    var arr = this.state.choices;
    arr[index].text = e.target.value;
    this.setState({choices: arr});
  }

  handleAdd(e) {
    var arr = this.state.choices;
    arr.push({text: '', value: ''});
    this.setState({choices: arr});
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
        margin: '0 5px',
        width: '150px'
      }
      const itemStyle = {
        boxShadow: 'none',
        border: '2px solid #C3C3C3',
        display: 'block',
        overflow: 'hidden',
        marginTop: '5px'
      }

      let items = this.state.choices.map(function(item, i) {
        return (
          <Paper key={i} style={itemStyle} zDepth={2}>
            <div className='form-group-options__item__header'></div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={wrapperFieldStyle}>
                <TextField
                  fullWidth={true}
                  floatingLabelText='value'
                  hintText="value"
                  value={this.state.choices[i].value}
                  onChange={this.handleValue.bind(this, i)}
                />
              </div>
              <div style={wrapperFieldStyle}>
                <TextField
                  fullWidth={true}
                  floatingLabelText='text element'
                  hintText='text element'
                  value={this.state.choices[i].text}
                  onChange={this.handleText.bind(this, i)}
                />
              </div>
            </div>
          </Paper>
        );
      }, this);

    return (
      <div>
        <TextField
          value={this.state.name}
          floatingLabelText='input name'
          onChange={this.handleName}
          fullWidth={true}
        />

        {items}
        <IconButton
          onTouchTap={this.handleAdd}
          tooltip="add input"
          tooltipPosition="bottom-right">
          <ContentAddCircle color={colors.pink200}/>
        </IconButton>
      </div>
    );
  }
}

const resetState ={
  uniqueId: null,
  type: 'text',
  name: null,
  placeholder: null,
  choices: []
}

class FormTagEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: this.props.uniqueId,
      type: this.props.type || 'text',
      name: this.props.name,
      placeholder: this.props.placeholder,
      choices: this.props.choices || []
    };

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.name && !nextProps.index) {
      this.setState(resetState);
    } else {
      let newState = {}
      let self = this;
      _.forEach(nextProps, function(value, key){
        if (_.has(self.state, key)) {
          newState[key] = value;
        }
      });
      this.setState(newState);
    }
  }

  handleChangeType(e, index, type) {
    this.setState({type: type});
  }

  handleCancel(e) {
    if (this.props.onCancel) {
      return this.props.onCancel(e);
    }
  }

  handleSave(e) {
    console.log('props', this.props);
    let tag = this.refs.inputTag.state;
    let type = this.state.type;
    let newTag = _.assign({}, tag, {type: type});
    if (this.props.onSave) {
      return this.props.onSave(this.props.index, newTag);
    }
  }

  getTagComponent(type) {
    let ref = 'inputTag'
    const tags = {
      text: function(props) {
        return ( <InputText {...props} ref={ref} /> );
      },
      email: function(props) {
        return ( <InputText  {...props} ref={ref}/> );
      },
      number: function(props) {
        return ( <InputText  {...props} ref={ref}/> );
      },
      checkbox: function(props) {
        return ( <InputCheckbox  {...props} ref={ref}/> );
      },
      radio: function(props) {
        return ( <InputRadio  {...props} ref={ref}/> );
      },
      select: function(props) {
        return ( <InputSelect  {...props} ref={ref}/> );
      },
    };

    let component = tags[type](this.state);
    return component;
  }

  render() {
    return (
      <div style={{boxSizing: 'border-box', padding: '5px'}}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <FlatButton label="cancelar" onTouchTap={this.handleCancel}/>
          <FlatButton label="salvar" primary={true} onTouchTap={this.handleSave}/>
        </div>
        <div>
          <DropDownMenu
          value={this.state.type}
          onChange={this.handleChangeType}
          style={{width: '150px'}}>
          <MenuItem value='text' primaryText="text"/>
          <MenuItem value='number' primaryText="number"/>
          <MenuItem value='email' primaryText="email"/>
          <MenuItem value='radio' primaryText="radio"/>
          <MenuItem value='checkbox' primaryText="checkbox"/>
          <MenuItem value='select' primaryText="select"/>
          </DropDownMenu>
        </div>
        <div>
          {this.getTagComponent(this.state.type)}
        </div>
      </div>
    );
  }
}

export default FormTagEdit;
