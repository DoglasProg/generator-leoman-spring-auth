package <%= packageName %>.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import <%= packageName %>.entity.UserAccess;
import <%= packageName %>.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public List<UserAccess> listUser() {
		return (List<UserAccess>) userRepository.findAll();
	}

	public List<UserAccess> findByName(String name) {
		return userRepository.findByNameLikeIgnoreCase(name);
	}

	public UserAccess saveUser(UserAccess userAdd) {
		return userRepository.save(userAdd);
	}

	public void removeUser(Long id) {
		userRepository.delete(id);
	}

	public UserAccess getById(Long id) {
		return userRepository.findOne(id);
	}

}
