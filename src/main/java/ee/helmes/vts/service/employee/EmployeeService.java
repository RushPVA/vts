package ee.helmes.vts.service.employee;

import ee.helmes.vts.domain.Employee;
import ee.helmes.vts.service.CrudService;

import java.util.Optional;

/**
 * Created by Viktor Podoprigo on 09.12.2017.
 */
public interface EmployeeService extends CrudService<Employee, String> {

  Optional<Employee> findByEmail(String email);

}
