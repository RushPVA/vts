package ee.helmes.vts.web.employee;

import ee.helmes.vts.domain.Employee;
import ee.helmes.vts.service.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by Viktor Podoprigo on 09.12.2017.
 */
@RestController
@RequestMapping("/employee")
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  @GetMapping
  public List<Employee> findAll() {
    return this.employeeService.findAll();
  }

  @GetMapping("/{id}")
  public Employee read(@PathVariable String id) {
    return this.employeeService.read(id);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void create(@Valid @RequestBody Employee employee) {
    this.employeeService.create(employee);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void update(@PathVariable String id, @Valid @RequestBody Employee employee) {
    this.employeeService.update(employee);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable String id) {
    this.employeeService.delete(id);
  }

  @GetMapping("/findByEmail")
  public ResponseEntity<Employee> existsByEmail(@RequestParam String email) {
    return this.employeeService.findByEmail(email)
      .map(employee -> ResponseEntity.ok().body(employee))
      .orElseGet(() -> ResponseEntity.noContent().build());
  }

}
