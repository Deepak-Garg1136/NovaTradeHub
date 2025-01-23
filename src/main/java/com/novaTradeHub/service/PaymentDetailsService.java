package com.novaTradeHub.service;

import com.novaTradeHub.models.PaymentDetails;
import com.novaTradeHub.models.User;

public interface PaymentDetailsService {

	PaymentDetails addPaymentDetails(String accountNumber, String accountHolderNameString, String ifsc, String bankName,
			User user);

	PaymentDetails getUserPaymentDetails(User user);
}
