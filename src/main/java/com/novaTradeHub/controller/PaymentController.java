package com.novaTradeHub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.novaTradeHub.domain.PaymentMethod;
import com.novaTradeHub.models.PaymentOrder;
import com.novaTradeHub.models.User;
import com.novaTradeHub.response.PaymentResponse;
import com.novaTradeHub.service.PaymentService;
import com.novaTradeHub.service.UserService;

@RestController
public class PaymentController {

	@Autowired
	private PaymentService paymentService;

	@Autowired
	private UserService userService;

	@PostMapping("/api/payment/{paymentMethod}/amount/{amount}")
	public ResponseEntity<PaymentResponse> paymentHandler(@PathVariable PaymentMethod paymentMethod,
			@PathVariable long amount, @RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);

		PaymentResponse paymentResponse;

		PaymentOrder order = paymentService.createOrder(user, amount, paymentMethod);

		if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {
			paymentResponse = paymentService.createRazorpayPaymentLink(user, amount, order.getId());
		} else {
			paymentResponse = paymentService.createStripePaymentLink(user, amount, order.getId());
		}
		return new ResponseEntity<PaymentResponse>(paymentResponse, HttpStatus.OK);
	}
}
