package <%= packageName %>.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import entity.RoleAccess;
import entity.UserAccess;
import repository.RoleRepository;
import repository.UserRepository;


@Component
public class InitialCharge implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;
    
    
    @Override
    public void onApplicationEvent(ContextRefreshedEvent e) {
    	

        List<RoleAccess> roles = roleRepository.findAll();

        if (roles.isEmpty()) {
     
            roleRepository.save(new RoleAccess("ROLE_ADMIN"));
            roleRepository.save(new RoleAccess("ROLE_USER"));
            roleRepository.save(new RoleAccess("ANNONIMOUS"));

            RoleAccess role = roleRepository.findByName("ROLE_ADMIN");

            List<RoleAccess> novosPerfis = new ArrayList<>();

            novosPerfis.add(role);

            userRepository.save(new UserAccess("ADMIN", "admin", "123", novosPerfis));

        }

    }

}
