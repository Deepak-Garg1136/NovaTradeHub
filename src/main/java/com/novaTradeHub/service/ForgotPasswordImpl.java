package com.novaTradeHub.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.novaTradeHub.domain.VerificationType;
import com.novaTradeHub.models.ForgotPasswordToken;
import com.novaTradeHub.models.User;
import com.novaTradeHub.repository.ForgotPasswordRepository;

@Service
public class ForgotPasswordImpl implements ForgotPasswordService {

	@Autowired
	private ForgotPasswordRepository repository;

	@Override
	public ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType,
			String sendto) {
		ForgotPasswordToken forgotPasswordToken = new ForgotPasswordToken(id, user, otp, verificationType, sendto);
		return repository.save(forgotPasswordToken);

	}

	@Override
	public ForgotPasswordToken findById(String id) {
		Optional<ForgotPasswordToken> fOptional = repository.findById(id);

		return fOptional.orElse(null);
	}

	@Override
	public ForgotPasswordToken findByUser(Long userId) {
		return repository.findByUserId(userId);

	}

	@Override
	public void deleteToken(ForgotPasswordToken forgotPasswordToken) {
		repository.delete(forgotPasswordToken);

	}

}
