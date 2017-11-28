package <%= packageName %>.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import <%= packageName %>entity.Parking;

public interface <%= projectName %>Repository extends MongoRepository<Parking, String> {

}
