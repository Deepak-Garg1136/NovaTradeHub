package com.novaTradeHub.service;

import com.novaTradeHub.models.TwoFactorOTP;
import com.novaTradeHub.models.User;

public interface TwoFactorOtpService {

	TwoFactorOTP createTwoFactorOTP(User user, String otp, String jwt);

	TwoFactorOTP findByUser(Long userId);

	TwoFactorOTP findById(String id);

	boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp);

	void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP);
}
