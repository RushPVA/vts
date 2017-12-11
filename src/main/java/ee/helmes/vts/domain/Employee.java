package ee.helmes.vts.domain;

import lombok.Data;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.Id;

import java.util.List;

/**
 * Created by Viktor Podoprigo on 09.12.2017.
 */
@Data
public class Employee {

  @Id
  private String id;

  @NotBlank
  private String name;

  @NotBlank
  private String surname;

  @Email
  private String email;

  private List<String> groups;

}
