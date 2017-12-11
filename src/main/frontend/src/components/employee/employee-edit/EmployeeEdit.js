// @flow
import React, {Component} from 'react';
import type {Employee} from 'domain/Emplyee';
import {InputText} from 'primereact/components/inputtext/InputText';
import {EmployeeService} from 'service/EmployeeService';
import {Button} from 'primereact/components/button/Button';
import ValidationMessage from 'components/forms/ValidationMessage';
import ValidationUtils from 'utils/ValidationUtils';
import classNames from 'classnames';
import {Messages} from 'primereact/components/messages/Messages';
import {GroupService} from 'service/GroupService';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import SyntheticInputEvent from 'react-dom/lib/SyntheticInputEvent'

type Props = {
  router: any,
  params: any
}

type State = {
  employee: Employee,
  touchedFields: any,
  messages: any[],
  defaultGroups: string[],
  filteredGroups: string[]
}


export default class EmployeeEdit extends Component<Props, State> {
  state = {
    employee: {name: '', surname: '', email: '', groups: []},
    touchedFields: {name: false, surname: false, email: false},
    messages: [],
    defaultGroups: [],
    filteredGroups: []
  };

  employeeService: EmployeeService;
  groupService: GroupService;

  constructor() {
    super();
    this.employeeService = new EmployeeService();
    this.groupService = new GroupService();
  }

  componentDidMount() {
    this.setState({defaultGroups: this.groupService.findDefault()});
    if (this.props.params.employeeId) {
      this.employeeService.read(this.props.params.employeeId).then((employee) => {
        this.setState({employee: employee});
      });
    }
  }

  save = () => {
    let validationResult = this.validate();
    if (validationResult.valid()) {
      this.employeeService.checkEmailExist(this.state.employee).then((emailNotExist) => {
        if (!emailNotExist) {
          this.employeeService.save(this.state.employee).then(() => {
            this.props.router.push('/employee?saveSuccess=true');
          });
        } else {
          this.setState({messages: [{severity: 'error', summary: 'Error Message', detail: 'Employee with such email already exists'}]});
        }
      });
    } else {
      this.setState({touchedFields: {name: true, surname: true, email: true}});
    }

  };

  cancel = () => {
    this.props.router.push('/employee');
  };

  static inputClass(value: ?string, valid: boolean): string {
    return classNames({'ui-state-filled': !!value, 'ng-invalid ng-dirty': !valid})
  }

  handleUserInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({employee: {...this.state.employee, [name]: value}});
  };

  handleBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const name = e.target.name;
    this.setState({touchedFields: {...this.state.touchedFields, [name]: true}});
  };

  validate(): EmployeeValidationResult {
    return new EmployeeValidationResult(
        ValidationUtils.notBlank(this.state.employee.name),
        ValidationUtils.notBlank(this.state.employee.surname),
        ValidationUtils.notBlank(this.state.employee.email),
        ValidationUtils.emailOrEmpty(this.state.employee.email)
    );
  }

  filterGroups = (e: SyntheticInputEvent<HTMLInputElement>) =>  {
    let results = this.state.defaultGroups.filter((group) => {
      return group.toLowerCase().indexOf(e.query.toLowerCase()) >= 0;
    });

    this.setState({filteredGroups: results});
  };

  onEnter = (e: SyntheticInputEvent<HTMLInputElement>) =>  {
    if(e.key === 'Enter'){
      this.setState({employee: {...this.state.employee, groups: [...this.state.employee.groups, e.target.value]}});
      e.target.value = '';
    }
  };

  render() {
    let validationResult = this.validate();
    return <div className="ui-g ui-fluid">
      <div className="ui-g-12">
        <div className="card card-w-title">
          <h1>{this.state.employee.id ? 'Edit Employee' : 'New Employee'}</h1>
          <div className="ui-g form-group">
            <div className="ui-g-12">
              <Messages value={this.state.messages} closable={false}/>
            </div>
            <div className="ui-g-12">
              <div className="ui-g-12 ui-md-4">
                <span className="md-inputfield">
                  <InputText name="name" className={EmployeeEdit.inputClass(this.state.employee.name, !this.state.touchedFields.name || validationResult.nameFilled)} value={this.state.employee.name} onInput={this.handleUserInput} onBlur={this.handleBlur} />
                  <label>Name</label>
                  <ValidationMessage show={this.state.touchedFields.name && !validationResult.nameFilled} message="Name is required field"/>
                </span>
              </div>
            </div>
            <div className="ui-g-12">
              <div className="ui-g-12 ui-md-4">
                <span className="md-inputfield">
                  <InputText name="surname" className={EmployeeEdit.inputClass(this.state.employee.surname, !this.state.touchedFields.surname || validationResult.surnameFilled)} value={this.state.employee.surname} onInput={this.handleUserInput} onBlur={this.handleBlur} />
                  <label>Surname</label>
                  <ValidationMessage show={this.state.touchedFields.surname && !validationResult.surnameFilled} message="Surname is required field"/>
                </span>
              </div>
            </div>
            <div className="ui-g-12">
              <div className="ui-g-12 ui-md-4">
                <span className="md-inputfield">
                  <InputText  name="email" className={EmployeeEdit.inputClass(this.state.employee.email, !this.state.touchedFields.email || validationResult.emailValid())} value={this.state.employee.email} onInput={this.handleUserInput} onBlur={this.handleBlur} />
                  <label>Email</label>
                  <ValidationMessage show={this.state.touchedFields.email && !validationResult.emailFilled} message="Email is required field"/>
                  <ValidationMessage show={this.state.touchedFields.email && !validationResult.emailWellFormatted} message="Email field has wrong format"/>
                </span>
              </div>
            </div>
            <div className="ui-g-12">
              <div className="ui-g-12 ui-md-4">
                <div className="ui-g-12">
                  <label>Groups</label>
                </div>
                <div className="ui-g-12" style={{marginBottom:'10px'}}>
                  <AutoComplete name="groups" value={this.state.employee.groups}
                                completeMethod={this.filterGroups} suggestions={this.state.filteredGroups}
                                minLength={1} multiple={true} onChange={(e) => this.setState({employee: {...this.state.employee, groups: e.value}})}
                                onKeyPress={this.onEnter}
                  />
                </div>
              </div>
            </div>
            <div className="ui-g-12 ui-md-4 text-right">
              <Button icon="ui-icon-save" style={{width: 'auto'}} label="Save" onClick={this.save}/>
              <Button icon="ui-icon-cancel" style={{width: 'auto'}} className="ui-button-danger" label="Cancel" onClick={this.cancel}/></div>
          </div>
        </div>
      </div>
    </div>
  }

}


class EmployeeValidationResult {
  nameFilled: boolean;
  surnameFilled: boolean;
  emailFilled: boolean;
  emailWellFormatted: boolean;


  constructor(nameFilled: boolean, surnameFilled: boolean, emailFilled: boolean, emailWellFormatted: boolean) {
    this.nameFilled = nameFilled;
    this.surnameFilled = surnameFilled;
    this.emailFilled = emailFilled;
    this.emailWellFormatted = emailWellFormatted;
  }

  valid(): boolean {
    return this.nameFilled && this.surnameFilled && this.emailValid();
  }

  emailValid(): boolean {
    return this.emailFilled && this.emailWellFormatted;
  }
}

