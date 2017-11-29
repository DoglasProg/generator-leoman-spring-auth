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
	private String passwordUser;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
	private Set<RoleAccess> roles;
	
	public UserAccess(UserAccess user) {
		this.name = user.getName();
		this.email = user.getEmail();
		this.passwordUser = user.getPasswordUser();
		this.roles = user.getRoles();
	}

	public UserAccess(String name, String email, String password, Set<RoleAccess> perfis) {
		this.name = name;
		this.email = email;
		this.passwordUser = password;
		this.roles = perfis;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPasswordUser() {
		return passwordUser;
	}

	public void setPasswordUser(String passwordUser) {
		this.passwordUser = passwordUser;
	}

	public Set<RoleAccess> getRoles() {
		return roles;
	}

	public void setRoles(Set<RoleAccess> roles) {
		this.roles = roles;
	}

}
