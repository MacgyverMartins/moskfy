'use strict';
import React         from 'react';
const _ = require( 'lodash' );
import CodeMirror from 'react-code-mirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/handlebars/handlebars';
import 'codemirror/addon/hint/html-hint';

class PagePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeExample: '<form action="/contact_form" method="post">',
      codeExampleEnd: '</form>',
      code: this.props.code
    };

    this.updateCode =  this.updateCode.bind(this);
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

  updateCode(e) {
    let newCode = e.target.value;
    this.setState({
      code: newCode
    });
  }

  render() {
    const codeExampleStyle = {
      background: 'rgb(60, 60, 60)',
      fontFamily: 'monospace',
      padding: '16px 13px',
      color: '#ADADAD',
      fontSize: '16px',
      borderTopRightRadius: '3px'
    }
    const codeExampleEndStyle = {
      background: 'rgb(60, 60, 60)',
      fontFamily: 'monospace',
      padding: '16px 13px',
      color: '#ADADAD',
      fontSize: '16px',
      borderBottomRightRadius: '3px'
    }

    return(
      <div>
        <div style={codeExampleStyle}>{this.state.codeExample}</div>
        <CodeMirror
          ref='formCode'
          style= {{fontSize: '14px', lineHeight: '21px' }}
          mode={{name: "handlebars", base: "text/html"}}
          theme='monokai'
          defaultValue={this.state.code}
          textAreaStyle={{ minHeight: '10em' }}
          lineNumbers={true}
          value={this.state.code}
          onChange={this.updateCode}/>
        <div style={codeExampleEndStyle}>{this.state.codeExampleEnd}</div>
      </div>
    );
  }
}

export default PagePost;
