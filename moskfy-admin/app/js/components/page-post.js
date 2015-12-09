'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';

const Paper = require('material-ui/lib/paper');
const TextField = require('material-ui/lib/text-field');
const DropDownMenu = require('material-ui/lib/drop-down-menu');

const propTypes = {
  onChangeTitle: React.PropTypes.func
};

class PagePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: ''
    };

    this.changedTitle = this.changedTitle.bind(this);
    this.changedContent = this.changedContent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title && nextProps.content) {
      this.setState({
        title: nextProps.title,
        content: nextProps.content
      });
    } else {
      this.setState({title: '', content: ''});
    }
  }

  changedTitle(event) {
    this.setState({ title: event.target.value });
    if (this.props.onChangeTitle) this.props.onChangeTitle(event);
  }

  changedContent(event) {
    this.setState({ content: event.target.value });
    //if (this.props.onChangeContent) this.props.onChangeContent(event);
  }

  render() {
    let main_style = {
      margin: '56px 0 0 256px',
      padding: '20px'
    };

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

        </div>
      </Paper>
    );
  }
}

PagePost.propTypes = propTypes;

export default PagePost;
