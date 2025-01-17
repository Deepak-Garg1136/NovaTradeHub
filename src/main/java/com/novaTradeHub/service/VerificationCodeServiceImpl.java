package com.novaTradeHub.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.novaTradeHub.domain.VerificationType;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.VerificationCode;
import com.novaTradeHub.repository.VerificationCodeRepository;
import com.novaTradeHub.utils.OtpUtils;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService {

	@Autowired
	private VerificationCodeRepository repository;

	@Override
	public VerificationCode sendVerificationCode(User user, VerificationType verificationType) {
		VerificationCode verificationCode = new VerificationCode();
		verificationCode.setOtp(OtpUtils.generateOtp());
		verificationCode.setUser(user);
		verificationCode.setVerificationType(verificationType);
		return repository.save(verificationCode);
	}

	@Override
	public VerificationCode getVerificationCodeById(Long id) throws Exception {
		Optional<VerificationCode> vOptional = repository.findById(id);
		if (vOptional.isEmpty()) {
			throw new Exception("Verification code not found");
		}
		return vOptional.get();
	}

	@Override
	public VerificationCode getVerificationCodeByUser(Long userId) {
		return repository.findByUserId(userId);
	}

	@Override
	public void deleteVerficationCode(VerificationCode verificationCode) {
		repository.delete(verificationCode);
	}

}
