// @flow
import React, { Component } from 'react';
import type {Employee} from 'domain/Emplyee';
import {InputText} from 'primereact/components/inputtext/InputText';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {EmployeeService} from 'service/EmployeeService';
import {Button} from 'primereact/components/button/Button';
import {Messages} from 'primereact/components/messages/Messages';
import {Dialog} from 'primereact/components/dialog/Dialog';

type State = {
  employees: Employee[],
  employeeFilter: string,
  messages: any[],
  showConfirmationDialog: boolean,
  employeeId?: string
}
type Props = {
  router: any;
}

export default class EmployeeList extends Component<Props, State> {
  state = {
    employees: [],
    employeeFilter: '',
    messages: [],
    showConfirmationDialog: false
  };
  employeeService: EmployeeService;

  constructor() {
    super();
    this.employeeService = new EmployeeService();
  }

  componentDidMount() {
    if (this.props.router.location.query.saveSuccess) {
      this.setState({messages: [{severity: 'success', summary: 'Info Message', detail: 'Employee was successfully saved'}]});
    }
    this.employeeService.findAll().then((employees) => {
      this.setState({employees: employees});
    });
  }


  controlsColumnTemplate = (employee: Employee, index: number) => {
    return <div>
      <Button icon="ui-icon-edit" onClick={(e) => {if (employee.id) {(this.props.router.push(`/employee/${employee.id}`))}}} />
      <Button className="ui-button-danger" icon="ui-icon-trash" onClick={(e) => {this.setState({showConfirmationDialog:true, employeeId: employee.id});}}/>
    </div>
  };

  groupsColumnTemplate = (employee: Employee, index: number) => {
    return <div>
      {employee.groups.join(', ')}
    </div>
  };

  removeEmployee = () => {
    if (this.state.employeeId) {
      this.employeeService.remove(this.state.employeeId).then((response) => {
        this.setState({messages: [{severity: 'success', summary: 'Info Message', detail: 'Employee was successfully deleted'}]});
        this.setState({showConfirmationDialog: false});
        this.employeeService.findAll().then((employees) => {
          this.setState({employees: employees});
        });
      });
    }
  };

  dialogFooter = <div className="ui-dialog-buttonpane ui-helper-clearfix">
    <Button icon="ui-icon-cancel" onClick={()=>this.setState({showConfirmationDialog:false})} label="No"/>
    <Button icon="ui-icon-check" className="ui-button-danger " onClick={()=>this.removeEmployee()} label="Yes"/>
  </div>;

  render() {
    return <div className="ui-g ui-fluid">
      <div className="ui-g-12">
        <div className="card card-w-title">
          <h1>Employees</h1>
          <div className="ui-g">
            <div className="ui-g-12">
              <Messages value={this.state.messages} closable={false}/>
            </div>
            <div className="ui-g-12 ui-md-3">
              <div className="ui-inputgroup">
              <span className="md-inputfield">
                <InputText  type="text" placeholder="Search" onInput={(e) => {this.setState({employeeFilter: e.target.value})}} />
                <i className="material-icons">search</i>
              </span>
              </div>
            </div>
            <div className="ui-g-12">
              <DataTable paginator={true} responsive={true} rows={5} value={this.state.employees} globalFilter={this.state.employeeFilter}>
                <Column field="id" header="ID" sortable={true}/>
                <Column field="name" header="Name" sortable={true}/>
                <Column field="surname" header="Surname" sortable={true}/>
                <Column field="email" header="Email" sortable={true}/>
                <Column field="groups" header="Groups" sortable={true} body={this.groupsColumnTemplate}/>
                <Column className="col-icon text-center"  style={{width:'120px'}} body={this.controlsColumnTemplate}/>
              </DataTable>
            </div>
            <div className="ui-g-12 text-right">
              <Button icon="ui-icon-plus" style={{width: 'auto'}} className="ui-button-success" label="Add" onClick={(e) => {this.props.router.push('/employee/new')}} />
            </div>
            <Dialog header="Confirmation" visible={this.state.showConfirmationDialog} modal={true} width="400px" footer={this.dialogFooter} onHide={()=>this.setState({showConfirmationDialog:false})}>
              <p>Are you sure to delete employee?</p>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  }

}
