package <%= packageName %>.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import <%= packageName %>.entity.RoleAccess;
import <%= packageName %>.repository.RoleRepository;


@Service
public class RoleService {

    @Autowired
    RoleRepository roleRepository;

    public List<RoleAccess> listRoles() {
        return roleRepository.findAll();
    }

    public Page<RoleAccess> listPaginated(int count, int page) {
        Pageable pages = new PageRequest(page, count);
        return roleRepository.findAll(pages);
    }

    public RoleAccess save(RoleAccess role) {
        return roleRepository.save(role);
    }

    public void delete(String id) {
        roleRepository.delete(id);
    }

    public RoleAccess getById(String id) {
        return roleRepository.findOne(id);
    }

}
