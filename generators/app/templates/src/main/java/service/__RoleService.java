package <%= packageName %>.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import <%= packageName %>.entity.RoleAccess;
import <%= packageName %>.repository.RoleRepository;

@Service
public class RoleService {

    @Autowired
    RoleRepository roleRepository;

    public List<RoleAccess> listRoles() {
        return (List<RoleAccess>) roleRepository.findAll();
    }

    public RoleAccess save(RoleAccess role) {
        return roleRepository.save(role);
    }

    public void delete(Long id) {
        roleRepository.delete(id);
    }

    public RoleAccess getById(Long id) {
        return roleRepository.findOne(id);
    }

}
