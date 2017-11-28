package entity;
package <%= packageName %>.entity;

import org.springframework.security.core.GrantedAuthority;

public class RoleAccess extends EntityGeneric implements GrantedAuthority {

	private static final long serialVersionUID = -5745635636983990823L;

	private String name;

	public _RoleAccess() {
	}

	public _RoleAccess(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setNome(String name) {
		this.name = name;
	}

	@Override
	public String getAuthority() {
		return name;
	}

}
