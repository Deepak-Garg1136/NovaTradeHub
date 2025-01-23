package com.novaTradeHub.service;

import java.util.List;

import com.novaTradeHub.domain.WalletTransactionType;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.Wallet;
import com.novaTradeHub.models.WalletTransaction;

public interface WalletTransactionService {
	List<WalletTransaction> getTransactionsByWallet(Wallet wallet);

	List<WalletTransaction> getTransactionsByUserId(User user);

	List<WalletTransaction> getAllTransactions();

	WalletTransaction createTransaction(Wallet wallet, String purpose, WalletTransactionType walletTransactionType,
			String transferId, double amount, User user);
}
