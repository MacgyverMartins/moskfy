'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
const _ = require( 'lodash' );

const Paper = require('material-ui/lib/paper');
const TextField = require('material-ui/lib/text-field');
const DropDownMenu = require('material-ui/lib/drop-down-menu');

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
      templates: []
    };

    this.changedTitle = this.changedTitle.bind(this);
    this.changedContent = this.changedContent.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
    this.handle = this.handle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title && nextProps.content) {
      this.setState({
        title: nextProps.title,
        content: nextProps.content,
      });
    } else if(nextProps.templates) {
      this.setState({
        templates: nextProps.templates
      });
    } else {
      this.setState({title: '', content: '', templates: []});
    }
  }

  changedTitle(event) {
    this.setState({ title: event.target.value });
  }

  changedContent(event) {
    this.setState({ content: event.target.value });
  }

  changeTemplate(event, selectedIndex, menuItem) {
    this.setState({ template: menuItem.text });
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

    let menuItems = _.map(this.state.templates, function(item) {
      return {text: item.name};
    });

    let indexTplActive = _.indexOf(menuItems, _.findWhere(menuItems, { 'text': this.state.template}));

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

          <DropDownMenu
            ref='dropdownTemplates'
            onTouchTap={this.handle}
            autoWidth={false}
            style={{ width: '400px' }}
            menuItemStyle={menuItemStyle}
            onChange={this.changeTemplate}
            selectedIndex={indexTplActive}
            menuItems={menuItems} />

        </div>
      </Paper>
    );
  }
}

PagePost.propTypes = propTypes;

export default PagePost;
