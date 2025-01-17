package com.novaTradeHub.service;

import com.novaTradeHub.domain.VerificationType;
import com.novaTradeHub.models.User;

public interface UserService {

	public User findUserProfileByJwt(String jwt) throws Exception;

	public User findUserByEmail(String email) throws Exception;

	public User findUserId(Long userId) throws Exception;

	public User enableTwoFactorAuthentication(VerificationType verificationType, String sendTo, User user);

	public User updatePasword(User user, String newPassword);

}