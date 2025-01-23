package com.novaTradeHub.service;

import com.novaTradeHub.domain.PaymentMethod;
import com.novaTradeHub.models.PaymentOrder;
import com.novaTradeHub.models.User;
import com.novaTradeHub.response.PaymentResponse;
import com.razorpay.RazorpayException;

public interface PaymentService {

	PaymentOrder createOrder(User user, long amount, PaymentMethod paymentMethod);

	PaymentOrder getPaymentOrderById(Long id) throws Exception;

	Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;

	PaymentResponse createRazorpayPaymentLink(User user, long amount, Long orderId) throws RazorpayException;

	PaymentResponse createStripePaymentLink(User user, long amount, Long orderId);

}
