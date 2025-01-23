package com.novaTradeHub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novaTradeHub.models.PaymentDetails;
import com.novaTradeHub.models.User;
import com.novaTradeHub.service.PaymentDetailsService;
import com.novaTradeHub.service.UserService;

@RestController
@RequestMapping("/api")
public class PaymentDetailsController {

	@Autowired
	private PaymentDetailsService paymentDetailsService;

	@Autowired
	private UserService userService;

	@PostMapping("/payment-details")
	public ResponseEntity<PaymentDetails> addPaymentDetails(@RequestBody PaymentDetails paymentDetails,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		PaymentDetails paymentDetails2 = paymentDetailsService.addPaymentDetails(paymentDetails.getAccountNumber(),
				paymentDetails.getAccountHolderName(), paymentDetails.getIfsc(), paymentDetails.getBankName(), user);
		return new ResponseEntity<PaymentDetails>(paymentDetails2, HttpStatus.CREATED);
	}

	@GetMapping("/payment-details")
	public ResponseEntity<PaymentDetails> getUserPaymentDetails(@RequestHeader("Authorization") String jwt)
			throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		PaymentDetails paymentDetails = paymentDetailsService.getUserPaymentDetails(user);
		return new ResponseEntity<PaymentDetails>(paymentDetails, HttpStatus.CREATED);
	}

}
