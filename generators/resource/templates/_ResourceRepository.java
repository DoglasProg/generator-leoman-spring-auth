package <%= packageName %>.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import <%= packageName %>.entity.<%= resourceName %>;

public interface <%= resourceName %>Repository extends MongoRepository<<%= resourceName %>, String> {

    <%= resourceName %> findByName(String name);

}
