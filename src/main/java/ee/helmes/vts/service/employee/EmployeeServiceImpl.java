package ee.helmes.vts.service.employee;

import ee.helmes.vts.dao.employee.EmployeeRepository;
import ee.helmes.vts.domain.Employee;
import ee.helmes.vts.service.BaseCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Created by Viktor Podoprigo on 09.12.2017.
 */
@Service
@Transactional
public class EmployeeServiceImpl extends BaseCrudService<Employee, String> implements EmployeeService {

  @Autowired
  private EmployeeRepository employeeRepository;

  @Override
  public PagingAndSortingRepository<Employee, String> getRepository() {
    return this.employeeRepository;
  }


  @Override
  public Optional<Employee> findByEmail(String email) {
    return this.employeeRepository.findByEmail(email);
  }
}
