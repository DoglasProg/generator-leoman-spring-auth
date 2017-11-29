package <%= packageName %>.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import <%= packageName %>.entity.UserAccess;
import <%= packageName %>.repository.UserRepository;
import <%= packageName %>.service.UserService;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository repository;

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public List<UserAccess> listar() {
        return this.userService.listUser();
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public UserAccess getById(@PathVariable Long id) {
        return this.userService.getById(id);
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public UserAccess salvar(@RequestBody UserAccess user) {
        return this.userService.saveUser(user);
    }

    @RequestMapping(value = "/user", method = RequestMethod.PUT)
    public UserAccess editar(@RequestBody UserAccess user) {
        return this.userService.saveUser(user);
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public void deletar(@PathVariable Long id) {
        this.userService.removeUser(id);
    }

    @RequestMapping(value = "/user/logado", method = RequestMethod.GET)
    @ResponseBody
    public UserAccess currentUserName(Principal principal) {
        UserAccess user = this.repository.findByEmail(principal.getName());
        user.setPasswordUser("");
        return user;
    }

}
