package <%= packageName %>.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import <%= packageName %>.entity.RoleAccess;
import <%= packageName %>.service.RoleService;

@RestController
public class RoleController {

    @Autowired
    RoleService roleService;

    @RequestMapping(value = "/role", method = RequestMethod.GET)
    public List<RoleAccess> listar() {
        return this.roleService.listRoles();
    }

    @RequestMapping(value = "/role/{id}", method = RequestMethod.GET)
    public RoleAccess getById(@PathVariable String id) {
        return this.roleService.getById(id);
    }

    @RequestMapping(value = "/role", method = RequestMethod.POST)
    public RoleAccess salvar(@RequestBody RoleAccess role) {
        return this.roleService.save(role);
    }

    @RequestMapping(value = "/role", method = RequestMethod.PUT)
    public RoleAccess editar(@RequestBody RoleAccess role) {
        return this.roleService.save(role);
    }

    @RequestMapping(value = "/role/{id}", method = RequestMethod.DELETE)
    public void deletar(@PathVariable String id) {
        this.roleService.delete(id);
    }

}
