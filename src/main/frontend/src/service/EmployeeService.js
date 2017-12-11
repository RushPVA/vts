// @flow
import type {Employee} from 'domain/Emplyee';
import Rest from 'fetch-on-rest'

export class EmployeeService {
  static instance: EmployeeService;
  constructor() {
    if(EmployeeService.instance){
      return EmployeeService.instance;
    }
    EmployeeService.instance = this;
  }
  api = new Rest('employee');

  findAll(): Promise<Employee[]> {
    return this.api.get('');
  }

  read(id: string): Promise<Employee> {
    return this.api.get(id);
  }

  save(employee: Employee): Promise<any> {
    if (employee.id) {
      return this.api.put(employee.id, employee);
    } else {
      return this.api.post('', employee);
    }
  }

  remove(id: string) {
    return this.api.del(id);
  }

  checkEmailExist(employee: Employee) {
    return this.api.get('findByEmail', {email: employee.email})
      .then((empl: Employee) => {
        return empl && empl.id !== employee.id;
      });
  }
}
