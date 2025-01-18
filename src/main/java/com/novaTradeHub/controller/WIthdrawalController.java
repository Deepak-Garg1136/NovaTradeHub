package com.novaTradeHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.novaTradeHub.models.User;
import com.novaTradeHub.models.Wallet;
import com.novaTradeHub.models.Withdrawal;
import com.novaTradeHub.service.UserService;
import com.novaTradeHub.service.WalletService;
import com.novaTradeHub.service.WithdrawalService;

@RestController

public class WIthdrawalController {

	@Autowired
	private WithdrawalService withdrawalService;

	@Autowired
	private WalletService walletService;

	@Autowired
	private UserService userService;

	@PostMapping("/api/withdrawal/{amount}")
	public ResponseEntity<?> withdrawalRequest(@PathVariable long amount, @RequestHeader("Authorization") String jwt)
			throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Wallet wallet = walletService.getUserWallet(user);

		Withdrawal withdrawal = withdrawalService.requestWithdrawal(amount, user);
		walletService.addBalance(wallet, -withdrawal.getAmount());
		return new ResponseEntity<>(withdrawal, HttpStatus.OK);
	}

	@PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
	public ResponseEntity<?> proccedWithdrawal(@PathVariable Long id, @PathVariable boolean accept,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Withdrawal withdrawal = withdrawalService.proccedWithdrawal(id, accept);
		Wallet wallet = walletService.getUserWallet(user);

		if (!accept) {
			walletService.addBalance(wallet, withdrawal.getAmount());
		}
		return new ResponseEntity<>(withdrawal, HttpStatus.OK);
	}

	@GetMapping("/api/withdrawal")
	public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(@RequestHeader("Authorization") String jwt)
			throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		List<Withdrawal> withdrawals = withdrawalService.getUserWithdrawalHistory(user);
		return new ResponseEntity<>(withdrawals, HttpStatus.OK);
	}

	@GetMapping("/api/admin/withdrawal")
	public ResponseEntity<List<Withdrawal>> getAllWithdrawalRequest(@RequestHeader("Authorization") String jwt)
			throws Exception {
//		User user = userService.findUserProfileByJwt(jwt);
		List<Withdrawal> withdrawals = withdrawalService.getAllWithdrawalRequest();
		return new ResponseEntity<>(withdrawals, HttpStatus.OK);
	}

}
