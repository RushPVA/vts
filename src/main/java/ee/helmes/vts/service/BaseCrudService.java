package ee.helmes.vts.service;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Viktor Podoprigo on 09.12.2017.
 */
public abstract class BaseCrudService<T, ID extends Serializable> implements CrudService<T, ID> {

  public abstract PagingAndSortingRepository<T, ID> getRepository();

  @Override
  public void create(T entity) {
    getRepository().save(entity);
  }

  @Override
  public T read(ID id) {
    return getRepository().findOne(id);
  }

  @Override
  public void update(T entity) {
    getRepository().save(entity);
  }

  @Override
  public void delete(ID id) {
    getRepository().delete(id);
  }

  @Override
  public List<T> findAll() {
    List<T> result = new ArrayList<>();
    getRepository().findAll().forEach(result::add);
    return result;
  }
}
