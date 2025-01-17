package com.novaTradeHub.service;

import com.novaTradeHub.domain.VerificationType;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.VerificationCode;

public interface VerificationCodeService {

	public VerificationCode sendVerificationCode(User user, VerificationType verificationType);

	public VerificationCode getVerificationCodeById(Long id) throws Exception;

	public VerificationCode getVerificationCodeByUser(Long userId);

	public void deleteVerficationCode(VerificationCode verificationCode);
}
