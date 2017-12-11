// @flow
import React, { Component } from 'react';

type Props = {
  show: boolean,
  message: string
}
export default class ValidationMessage extends Component<Props> {
  render() {
    return  <div className="ui-message ui-messages-error ui-corner-all hidden" style={{display: this.props.show ? 'block' : 'none'}}>
      {this.props.message}
    </div>
  }

}

