package service;
package <%= packageName %>.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import <%= packageName %>.entity.UserAccess;
import <%= packageName %>.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public List<UserAccess> listUser() {
		return userRepository.findAll();
	}

	public Page<UserAccess> listPaginated(int count, int page) {
		Pageable pages = new PageRequest(page, count);
		return userRepository.findAll(pages);
	}

	public List<UserAccess> findByName(String name) {
		return userRepository.findByNameLikeIgnoreCase(name);
	}

	public UserAccess saveUser(UserAccess userAdd) {
		return userRepository.save(userAdd);
	}

	public void removeUser(String id) {
		userRepository.delete(id);
	}

	public UserAccess getById(String id) {
		return userRepository.findOne(id);
	}

}
