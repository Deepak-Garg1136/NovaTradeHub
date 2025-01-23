package com.novaTradeHub.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.novaTradeHub.domain.PaymentMethod;
import com.novaTradeHub.domain.PaymentOrderStatus;
import com.novaTradeHub.models.PaymentOrder;
import com.novaTradeHub.models.User;
import com.novaTradeHub.repository.PaymentOrderRepository;
import com.novaTradeHub.response.PaymentResponse;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentOrderRepository repository;

	@Value("${stripe.api.key}")
	private String stripeSecretKey;

	@Value("${razorpay.api.secret}")
	private String apiSecretKey;

	@Value("${razorpay.api.key}")
	private String apiKey;

	@Override
	public PaymentOrder createOrder(User user, long amount, PaymentMethod paymentMethod) {
		PaymentOrder paymentOrder = new PaymentOrder();
		paymentOrder.setAmount(amount);
		paymentOrder.setPaymentMethod(paymentMethod);
		paymentOrder.setUser(user);
		paymentOrder.setStatus(PaymentOrderStatus.PENDING);
		return repository.save(paymentOrder);
	}

	@Override
	public PaymentOrder getPaymentOrderById(Long id) throws Exception {
		return repository.findById(id).orElseThrow(() -> new Exception("Payment order not found"));
	}

	@Override
	public Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException {
		if (paymentOrder.getStatus() == null) {
			paymentOrder.setStatus(PaymentOrderStatus.PENDING);
		}
		if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
			if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {
				RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecretKey);
				Payment payment = razorpay.payments.fetch(paymentId);

				Integer amount = payment.get("amount");
				String status = payment.get("status");

				if (status.equals("captured")) {
					paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
					return true;
				}

				paymentOrder.setStatus(PaymentOrderStatus.FAILED);
				repository.save(paymentOrder);
				return false;
			}
			paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
			repository.save(paymentOrder);
			return true;
		}
		return false;
	}

	@Override
	public PaymentResponse createRazorpayPaymentLink(User user, long amount, Long orderId) throws RazorpayException {
		Long Amount = amount * 100; // converting amount in Paise

		try {
			RazorpayClient rezorpay = new RazorpayClient(apiKey, apiSecretKey);

			JSONObject paymentLinkRequest = new JSONObject();
			paymentLinkRequest.put("amount", Amount);
			paymentLinkRequest.put("currency", "INR");

			JSONObject customer = new JSONObject();
			customer.put("name", user.getFullName());

			JSONObject notify = new JSONObject();
			notify.put("email", true);
			paymentLinkRequest.put("notify", notify);

			paymentLinkRequest.put("reminder_enable", true);

			paymentLinkRequest.put("callback_url", "http://localhost:5173/wallet?order_id=" + orderId);
			paymentLinkRequest.put("callback_method", "get");

			PaymentLink payment = rezorpay.paymentLink.create(paymentLinkRequest);
			String paymentLinkId = payment.get("id");
			String paymentLinkUrl = payment.get("short_url");

			PaymentResponse response = new PaymentResponse();
			response.setPayment_url(paymentLinkUrl);

			return response;
		} catch (Exception e) {
			System.out.println("Error creating payment link: " + e.getMessage());
			throw new RazorpayException(e.getMessage());
		}
	}

	@Override
	public PaymentResponse createStripePaymentLink(User user, long amount, Long orderId) {
		Stripe.apiKey = stripeSecretKey;

//		SessionCreateParams params = SessionCreateParams.builder()
		return null;
	}

}
