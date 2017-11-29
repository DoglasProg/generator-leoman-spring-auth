package <%= packageName %>.config;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import <%= packageName %>.entity.RoleAccess;
import <%= packageName %>.entity.UserAccess;
import <%= packageName %>.repository.RoleRepository;
import <%= packageName %>.repository.UserRepository;


@Component
public class InitialCharge implements ApplicationListener<ContextRefreshedEvent> {

   @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;
    
    
    @Override
    public void onApplicationEvent(ContextRefreshedEvent e) {
    	

        List<RoleAccess> roles = (List<RoleAccess>) roleRepository.findAll();

        if (roles.isEmpty()) {
     
            roleRepository.save(new RoleAccess("ROLE_ADMIN"));
            roleRepository.save(new RoleAccess("ROLE_USER"));
            roleRepository.save(new RoleAccess("ANNONIMOUS"));

            RoleAccess roleAdmin = roleRepository.findByName("ROLE_ADMIN");
            RoleAccess roleUser = roleRepository.findByName("ROLE_USER");
            RoleAccess roleAnonymous = roleRepository.findByName("ANONYMOUS");

            Set<RoleAccess> perfisAdmin = new HashSet<RoleAccess>();
            perfisAdmin.add(roleAdmin);

            Set<RoleAccess> perfisUser = new HashSet<RoleAccess>();
            perfisUser.add(roleUser);

            Set<RoleAccess> perfisAnonymous = new HashSet<RoleAccess>();
            perfisAnonymous.add(roleAnonymous);

            userRepository.save(new UserAccess("admin", "admin@admin.com", "123", perfisAdmin));
            userRepository.save(new UserAccess("user", "user@user.com", "123", perfisUser));
            userRepository.save(new UserAccess("anonymous", "anonymous@anonymous.com", "123", perfisAnonymous));

        }

    }


}
