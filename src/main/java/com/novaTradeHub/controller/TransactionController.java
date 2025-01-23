package com.novaTradeHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.novaTradeHub.models.User;
import com.novaTradeHub.models.Wallet;
import com.novaTradeHub.models.WalletTransaction;
import com.novaTradeHub.service.UserService;
import com.novaTradeHub.service.WalletService;
import com.novaTradeHub.service.WalletTransactionService;

@RestController
public class TransactionController {

	@Autowired
	private WalletTransactionService walletTransactionService;

	@Autowired
	private UserService userService;

	@Autowired
	private WalletService walletService;

	@GetMapping("/api/transactions/wallet")
	public ResponseEntity<List<WalletTransaction>> getUserWalletTransactions(@RequestHeader("Authorization") String jwt)
			throws Exception {
		User user = userService.findUserProfileByJwt(jwt);

		Wallet wallet = walletService.getUserWallet(user);

		List<WalletTransaction> transactions = walletTransactionService.getTransactionsByWallet(wallet);

		return new ResponseEntity<List<WalletTransaction>>(transactions, HttpStatus.OK);
	}

	@GetMapping("/api/transactions/user")
	public ResponseEntity<List<WalletTransaction>> getAllTransactionsByUser(@RequestHeader("Authorization") String jwt)
			throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		List<WalletTransaction> transactions = walletTransactionService.getTransactionsByUserId(user);

		return new ResponseEntity<List<WalletTransaction>>(transactions, HttpStatus.OK);
	}

	@GetMapping("/api/transactions")
	public ResponseEntity<List<WalletTransaction>> getAllTransactions(@RequestHeader("Authorization") String jwt)
			throws Exception {

		List<WalletTransaction> transactions = walletTransactionService.getAllTransactions();

		return new ResponseEntity<List<WalletTransaction>>(transactions, HttpStatus.OK);
	}
}
