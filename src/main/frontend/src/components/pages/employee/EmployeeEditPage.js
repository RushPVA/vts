// @flow
import React, { Component } from 'react';
import Page from 'components/organisms/page/Page';
import EmployeeEdit from 'components/organisms/employee/employee-edit/EmployeeEdit';

type Props = {
  router: any;
  params: any;
}

export default class EmployeeEditPage extends Component<Props> {
  render() {
    return <Page title={this.props.params.employeeId ? 'Edit Employee' : 'New Employee'}>
      <EmployeeEdit {...this.props} />
    </Page>
  }
}

