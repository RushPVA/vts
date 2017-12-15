// @flow
import React, { Component } from 'react';
import EmployeeList from 'components/organisms/employee/epmloyee-list/EmployeeList';
import Page from 'components/organisms/page/Page';

type Props = {
  router: any;
}

export default class EmployeeListPage extends Component<Props> {
  render() {
    return <Page title="Employees">
      <EmployeeList {...this.props} />
    </Page>
  }
}
