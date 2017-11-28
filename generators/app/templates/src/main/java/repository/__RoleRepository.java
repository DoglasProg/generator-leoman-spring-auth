package <%= packageName %>.repository;

import org.springframework.data.repository.CrudRepository;

import <%= packageName %>.entity.RoleAccess;
import <%= packageName %>.entity.RoleAccess;

public interface RoleRepository extends CrudRepository<RoleAccess, Long> {

    RoleAccess findByName(String name);

}
