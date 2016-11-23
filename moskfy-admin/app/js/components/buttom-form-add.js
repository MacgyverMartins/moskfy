'use strict';
import React from 'react';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ActionInput from 'material-ui/lib/svg-icons/action/input';
import ToggleCheckBox from 'material-ui/lib/svg-icons/toggle/check-box';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

class ButtomFormAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleTouch = this.handleTouch.bind(this);
    this.handleAddInputText = this.handleAddInputText.bind(this);
    this.handleAddOptions = this.handleAddOptions.bind(this);
  }

  handleTouch(event) {
    this.setState({open: !this.state.open});
  }

  handleAddInputText(event) {
    if (this.props.onToggleAddInput) {
      this.props.onToggleAddInput();
    }
    this.setState({open: !this.state.open});
  }

  handleAddOptions(event) {
    if (this.props.onToggleAddOptions) {
      this.props.onToggleAddOptions();
    }
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div className="buttom-form-add"
        style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center'}}>
        {(this.state.open) ?
          <div style={{display: 'inline-block'}}>
            <FloatingActionButton mini={true}
              onTouchTap={this.handleAddInputText} style={{margin: '2px'}}>
              <ActionInput />
            </FloatingActionButton>
            <FloatingActionButton mini={true}
              onTouchTap={this.handleAddOptions} style={{margin: '2px'}}>
              <ToggleCheckBox />
            </FloatingActionButton>
          </div>
        : ''}
        <div style={{display: 'inline-block'}}>
          <FloatingActionButton onTouchTap={this.handleTouch}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}

export default ButtomFormAdd;

