package <%= packageName %>.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import <%= packageName %>.entity.UserAccess;

public interface UserRepository extends CrudRepository<UserAccess, Long> {
	List<UserAccess> findByNameLikeIgnoreCase(String name);

	UserAccess findByEmail(String email);
}
