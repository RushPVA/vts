// @flow
import React, { Component } from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';

type Props = {
  router: any;
  params: any;
}

export default class LoginPage extends Component<Props> {
  render() {
    return <div className="login-body">
      <div className="card login-panel ui-fluid">
        <div className="ui-g">
          <div className="ui-g-12">
            <div className="login-title">VACATION TRACKING SYSTEM</div>
          </div>
          <div className="ui-g-12">
            <span className="md-inputfield">
              <InputText name="username" />
              <label>Username</label>
            </span>
          </div>
          <div className="ui-g-12">
            <span className="md-inputfield">
              <InputText type="password" name="password" />
              <label>Password</label>
            </span>
          </div>
          <div className="ui-g-12">
            <Button icon="ui-icon-person" label="Sign In" onClick={() => {this.props.router.push('/employee')}}/>
            <Button icon="ui-icon-create" className="secondary" label="Register" onClick={() => {this.props.router.push('/employee')}}/>
          </div>
        </div>
      </div>
    </div>
  }
}

