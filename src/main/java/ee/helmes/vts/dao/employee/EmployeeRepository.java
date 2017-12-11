package ee.helmes.vts.dao.employee;

import ee.helmes.vts.domain.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 * Created by Viktor Podoprigo on 09.12.2017.
 */
public interface EmployeeRepository extends MongoRepository<Employee, String> {

  Optional<Employee> findByEmail(String email);
}
