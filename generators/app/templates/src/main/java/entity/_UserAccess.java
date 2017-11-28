package <%= packageName %>.entity;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;

public class UserAccess extends EntityGeneric {

	private String name;

	private String email;

	private String passwordUser;

	@DBRef
	private List<RoleAccess> roles;

	public UserAccess() {
	}

	public UserAccess(UserAccess user) {
		this.name = user.getName();
		this.email = user.getEmail();
		this.passwordUser = user.getPasswordUser();
		this.roles = user.getRoles();
	}

	public UserAccess(String name, String email, String password, List<RoleAccess> perfis) {
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

	public List<RoleAccess> getRoles() {
		return roles;
	}

	public void setRoles(List<RoleAccess> roles) {
		this.roles = roles;
	}

}