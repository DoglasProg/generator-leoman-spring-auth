package <%= packageName %>.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import <%= packageName %>.entity.UserAccess;

public interface UserRepository extends MongoRepository<UserAccess, String> {

    List<UserAccess> findByNameLikeIgnoreCase(String name);
    
    UserAccess findByEmail(String email);
}
