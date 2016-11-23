'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
const _ = require( 'lodash' );

const Paper = require('material-ui/lib/paper');
const TextField = require('material-ui/lib/text-field');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
import MenuItem from 'material-ui/lib/menus/menu-item';

import PageActions from '../actions/PageActions';

const propTypes = {
  onChangeTitle: React.PropTypes.func
};

class PagePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      templates: [{name: 'Default'}],
      template: 'Default'
    };

    this.changedTitle = this.changedTitle.bind(this);
    this.changedContent = this.changedContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handle = this.handle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let self = this;
    _.forEach(nextProps, function(value, key){
      if (self.state[key] !== value) {
        let newState = {}
        newState[key] = value;
        self.setState(newState);
      }
      console.log('this', this);
    }, this);
  }

  changedTitle(event) {
    if (this.props.onChangeTitle) {
      return this.props.onChangeTitle(event.target.value);
    }
    this.setState({ title: event.target.value });
  }

  changedContent(event) {
    if (this.props.onChangeContent) {
      return this.props.onChangeContent(event.target.value);
    }
    this.setState({ content: event.target.value });
  }

  handleChange(e, index, value) {
    if (this.props.onChangeTemplate) {
      return this.props.onChangeTemplate(value);
    }
    this.setState({ template: value });
  }

  handle(event) {
    if (!this.refs.dropdownTemplates.state.open){
      PageActions.getTemplates();
    };
  }

  render() {
    let main_style = {
      margin: '56px 0 0 256px',
      padding: '20px'
    };

    let menuItemStyle = {
      cursor: 'pointer',
      lineHeight: '32px',
      paddingLeft: '24px',
      paddingRight: '48px',
      color: 'rgba(0, 0, 0, 0.870588)',
      height: '32px',
      whiteSpace: 'nowrap',
      WebkitUserSelect: 'none'
    }

    //let tplIndex = _.indexOf(this.state.templates, _.findWhere(this.state.templates, { 'name': this.state.template}));
    //tplIndex = (tplIndex == -1) ? 0 : tplIndex;

    console.log('template', this.state.template);
    return (
      <Paper zDepth={1}>
        <div style={{padding: '25px'}}>

          <TextField
            fullWidth={true}
            hintText="Nome da página"
            floatingLabelText="Nome da página"
            value={this.state.title}
            onChange={this.changedTitle} />

          <TextField
            style={{marginTop:'50px'}}
            fullWidth={ true }
            hintText="Insira aqui o conteúdo da página"
            value={this.state.content}
            onChange={this.changedContent} />

            <DropDownMenu ref='dropdownTemplates'
            value={this.state.template}
            onChange={this.handleChange}
            onTouchTap={this.handle}
            autoWidth={false}
            style={{ width: '400px' }}
            menuItemStyle={menuItemStyle} >
            {this.state.templates.map(function(item, i){
              return (
                <MenuItem key={item.name}
                style={menuItemStyle}
                value={item.name}
                labe={item.name}
                primaryText={item.name} />
              );
            }, this)}
        </DropDownMenu>

        <h1>macgyver</h1>

        </div>
      </Paper>
    );
  }
}

PagePost.propTypes = propTypes;

export default PagePost;
