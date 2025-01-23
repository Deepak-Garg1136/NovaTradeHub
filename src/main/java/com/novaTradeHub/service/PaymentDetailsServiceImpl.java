package com.novaTradeHub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.novaTradeHub.models.PaymentDetails;
import com.novaTradeHub.models.User;
import com.novaTradeHub.repository.PaymentDetailsRepository;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {

	@Autowired
	private PaymentDetailsRepository repository;

	@Override
	public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderNameString, String ifsc,
			String bankName, User user) {
		PaymentDetails paymentDetails = new PaymentDetails();
		paymentDetails.setAccountHolderName(accountHolderNameString);
		paymentDetails.setAccountNumber(accountNumber);
		paymentDetails.setBankName(bankName);
		paymentDetails.setIfsc(ifsc);
		paymentDetails.setUser(user);
		return repository.save(paymentDetails);
	}

	@Override
	public PaymentDetails getUserPaymentDetails(User user) {
		return repository.findByUserId(user.getId());
	}

}
