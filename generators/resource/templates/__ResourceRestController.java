package <%= packageName %>;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import <%= packageName %>.entity.<%= resourceName %>;
import <%= packageName %>.repository.<%= resourceName %>Repository;
import <%= packageName %>.service.<%= resourceName %>Service;


@RestController
@RequestMapping("/<%= lowerResourceName %>")
public class <%= resourceName %>RestController {

    @Autowired
    private <%= resourceName %>Repository <%= lowerResourceName %>Repository;

    <% if (criarGET == true) { %>    
    @RequestMapping(method = RequestMethod.GET)
    public List<<%= resourceName %>> findAll() {
        return <%= lowerResourceName %>Repository.findAll();
    }
    <% } %>
    <% if (criarPOST == true) { %>
    @RequestMapping(method = RequestMethod.POST)
    public <%= resourceName %> add(@RequestBody <%= resourceName %> <%= lowerResourceName %>) {
        return <%= lowerResourceName %>Repository.save(<%= lowerResourceName %>);
    }
    <% } %>  
    <% if (criarPUT == true) { %>
    @RequestMapping(method = RequestMethod.PUT)
    public <%= resourceName %> update(@RequestBody <%= resourceName %> <%= lowerResourceName %>) {
        return <%= lowerResourceName %>Repository.save(<%= lowerResourceName %>);
    }
    <% } %>  
    <% if (criarDELETE == true) { %>
    @RequestMapping(method = RequestMethod.DELETE, value = "/{<%= lowerResourceName %>Id}")
    public void delete(@PathVariable Long <%= lowerResourceName %>Id) {
        <%= lowerResourceName %>Repository.delete(<%= lowerResourceName %>Id);
    }
    <% } %> 
	
}

