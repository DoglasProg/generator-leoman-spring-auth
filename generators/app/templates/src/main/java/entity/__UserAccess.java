package <%= packageName %>.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

@Entity
public class UserAccess extends EntityGeneric implements Serializable {

	private static final long serialVersionUID = 201404140102L;
	
	@Column(length = 300, nullable = false)
	private String name;

	@Column(length = 300, nullable = false, unique = true)
	private String email;

	@Column(length = 32, nullable = false)
	private String password;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
	private Set<RoleAccess> roles;

	

}
