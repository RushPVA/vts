import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from 'components/layout/app/App';
import {Router, Route, hashHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import IndexRedirect from 'react-router/es/IndexRedirect';
import OnePage from 'components/pages/one-page/OnePage';
import OneMorePage from 'components/pages/one-more-page/OneMorePage';
import EmployeeList from 'components/employee/epmloyee-list/EmployeeList';
import EmployeeEdit from 'components/employee/employee-edit/EmployeeEdit';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/employee"/>
      <Route path="/employee" component={EmployeeList}/>
      <Route path="/employee/new" component={EmployeeEdit}/>
      <Route path="/employee/:employeeId" component={EmployeeEdit}/>
      <Route path="/one-page" component={OnePage}/>
      <Route path="/one-more-page" component={OneMorePage}/>
    </Route>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
