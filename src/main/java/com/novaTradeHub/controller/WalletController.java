package com.novaTradeHub.controller;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novaTradeHub.domain.WalletTransactionType;
import com.novaTradeHub.models.Order;
import com.novaTradeHub.models.PaymentOrder;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.Wallet;
import com.novaTradeHub.models.WalletTransaction;
import com.novaTradeHub.service.OrderService;
import com.novaTradeHub.service.PaymentService;
import com.novaTradeHub.service.UserService;
import com.novaTradeHub.service.WalletService;
import com.novaTradeHub.service.WalletTransactionService;

@RestController
public class WalletController {

	@Autowired
	private WalletService walletService;

	@Autowired
	private UserService userService;

	@Autowired
	private OrderService orderService;

	@Autowired
	private PaymentService paymentService;

	@Autowired
	private WalletTransactionService walletTransactionService;

	@GetMapping("/api/wallet")
	public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Wallet wallet = walletService.getUserWallet(user);

		return new ResponseEntity<Wallet>(wallet, HttpStatus.ACCEPTED);
	}

	@PutMapping("/api/wallet/{walletId}/transfer")
	public ResponseEntity<Wallet> walletToWalletTransfer(@RequestHeader("Authorization") String jwt,
			@PathVariable Long walletId, @RequestBody WalletTransaction walletTransaction) throws Exception {
		User senderUser = userService.findUserProfileByJwt(jwt);
		Wallet receiverWallet = walletService.findWalletById(walletId);
		Wallet wallet = walletService.walletToWalletTransfer(senderUser, receiverWallet, walletTransaction.getAmount());
		walletTransactionService.createTransaction(wallet, walletTransaction.getPurpose(),
				WalletTransactionType.WALLET_TRANSFER, walletTransaction.getTransferId(), walletTransaction.getAmount(),
				senderUser);
		return new ResponseEntity<Wallet>(wallet, HttpStatus.ACCEPTED);
	}

	@PutMapping("/api/wallet/order/{orderId}/pay")
	public ResponseEntity<Wallet> payOrderPayment(@RequestHeader("Authorization") String jwt,
			@PathVariable Long orderId) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Order order = orderService.getOrderById(orderId);

		Wallet wallet = walletService.payOrderPayment(order, user);

		return new ResponseEntity<Wallet>(wallet, HttpStatus.ACCEPTED);
	}

	@PutMapping("/api/wallet/deposite")
	public ResponseEntity<Wallet> addMoneyToWallet(@RequestHeader("Authorization") String jwt,
			@RequestParam(name = "order_id") Long orderId, @RequestParam(name = "payment_id") String paymentId)
			throws Exception {
		User user = userService.findUserProfileByJwt(jwt);

		Wallet wallet = walletService.getUserWallet(user);

		PaymentOrder order = paymentService.getPaymentOrderById(orderId);
		Boolean status = paymentService.proceedPaymentOrder(order, paymentId);
		if (wallet.getBalance() == null) {
			wallet.setBalance(BigDecimal.valueOf(0));
		}
		if (status) {
			wallet = walletService.addBalance(wallet, order.getAmount());
			walletTransactionService.createTransaction(wallet, "Add Money to Wallet", WalletTransactionType.ADD_MONEY,
					null, order.getAmount(), user);
		}
		return new ResponseEntity<Wallet>(wallet, HttpStatus.ACCEPTED);
	}
}
