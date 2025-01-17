package com.novaTradeHub.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.novaTradeHub.models.TwoFactorOTP;
import com.novaTradeHub.models.User;
import com.novaTradeHub.repository.TwoFactorOtpRepository;

@Service
public class TwoFactorOtpServiceImpl implements TwoFactorOtpService {

	@Autowired
	private TwoFactorOtpRepository repository;

	@Override
	public TwoFactorOTP createTwoFactorOTP(User user, String otp, String jwt) {
		UUID uuid = UUID.randomUUID();

		String id = uuid.toString();
		TwoFactorOTP twoFactorOTP = new TwoFactorOTP();
		twoFactorOTP.setId(id);
		twoFactorOTP.setJwt(jwt);
		twoFactorOTP.setOtp(otp);
		twoFactorOTP.setUser(user);
		return repository.save(twoFactorOTP);
	}

	@Override
	public TwoFactorOTP findByUser(Long userId) {
		return repository.findByUserId(userId);
	}

	@Override
	public TwoFactorOTP findById(String id) {
		Optional<TwoFactorOTP> tOptional = repository.findById(id);
		return tOptional.orElse(null);
	}

	@Override
	public boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp) {
		return twoFactorOTP.getOtp().equals(otp);
	}

	@Override
	public void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP) {
		repository.delete(twoFactorOTP);
	}

}
