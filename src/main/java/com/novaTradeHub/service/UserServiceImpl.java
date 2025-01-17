package com.novaTradeHub.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.novaTradeHub.config.JwtProvider;
import com.novaTradeHub.domain.VerificationType;
import com.novaTradeHub.models.TwoFactorAuth;
import com.novaTradeHub.models.User;
import com.novaTradeHub.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repository;

	@Override
	public User findUserProfileByJwt(String jwt) throws Exception {
		String emailString = JwtProvider.getEmailFromJwtToken(jwt);
		User user = repository.findByEmail(emailString);
		if (user == null) {
			throw new Exception("User not found");
		}
		return user;
	}

	@Override
	public User findUserByEmail(String email) throws Exception {
		User user = repository.findByEmail(email);
		if (user == null) {
			throw new Exception("User not found");
		}
		return user;

	}

	@Override
	public User findUserId(Long userId) throws Exception {
		Optional<User> userOptional = repository.findById(userId);
		if (userOptional.isEmpty()) {
			throw new Exception("User not found");
		}
		return userOptional.get();
	}

	@Override
	public User updatePasword(User user, String newPassword) {
		user.setPassword(newPassword);
		return repository.save(user);
	}

	@Override
	public User enableTwoFactorAuthentication(VerificationType verificationType, String sendTo, User user) {
		TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
		twoFactorAuth.setEnabled(true);
		twoFactorAuth.setSendTo(verificationType);

		user.setTwoFactorAuth(twoFactorAuth);
		User user2 = repository.save(user);
		return user2;
	}

}
