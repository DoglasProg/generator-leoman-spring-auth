package <%= packageName %>.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import <%= packageName %>.entity.<%= projectName %>;
import <%= packageName %>.repository.<%= projectName %>Repository;


@Service
public class <%= projectName %>Service {

    @Autowired
    <%= projectName %>Repository repository;

    public void delete(String id) {
    	repository.delete(id);
    }

    public <%= projectName %> getById(String id) {
        return repository.findOne(id);
    }
    
    public <%= projectName %> save(<%= projectName %> entity) {
    	return repository.save(entity);
    }

}
