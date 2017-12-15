import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from 'components/layout/app/App';
import {Router, Route, hashHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import OnePage from 'components/pages/one-page/OnePage';
import OneMorePage from 'components/pages/one-more-page/OneMorePage';
import EmployeeListPage from 'components/pages/employee/EmployeeListPage';
import EmployeeEditPage from 'components/pages/employee/EmployeeEditPage';
import LoginPage from 'components/pages/login/LoginPage';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/"  component={LoginPage}/>
    <Route component={App}>
      <Route path="/employee" component={EmployeeListPage}/>
      <Route path="/employee/new" component={EmployeeEditPage}/>
      <Route path="/employee/:employeeId" component={EmployeeEditPage}/>
      <Route path="/one-page" component={OnePage}/>
      <Route path="/one-more-page" component={OneMorePage}/>
    </Route>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
