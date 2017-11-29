package <%= packageName %>.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.security.core.GrantedAuthority;

@Entity
public class RoleAccess extends EntityGeneric implements GrantedAuthority {

	private static final long serialVersionUID = 201404140102L;
	
	@Column(length = 15, nullable = false)
	private String name;

	@ManyToOne(cascade = CascadeType.ALL, optional = true, fetch = FetchType.EAGER)
	@JoinColumn(name = "user", nullable = false)
	private UserAccess user;

	public RoleAccess() {
	}

	public RoleAccess(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setNome(String name) {
		this.name = name;
	}
	
	public UserAccess getUser() {
		return user;
	}

	public void setUser(UserAccess user) {
		this.user = user;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String getAuthority() {
		return name;
	}

}
