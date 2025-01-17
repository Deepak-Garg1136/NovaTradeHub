package com.novaTradeHub.service;

import com.novaTradeHub.domain.VerificationType;
import com.novaTradeHub.models.ForgotPasswordToken;
import com.novaTradeHub.models.User;

public interface ForgotPasswordService {
	ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendto);

	ForgotPasswordToken findById(String id);

	ForgotPasswordToken findByUser(Long userId);

	void deleteToken(ForgotPasswordToken forgotPasswordToken);
}
