package ee.helmes.vts.service;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Viktor Podoprigo on 09.12.2017.
 */
public interface CrudService<T, ID extends Serializable> {

  void create(T entity);
  T read(ID id);
  void update(T entity);
  void delete(ID id);
  List<T> findAll();

}
