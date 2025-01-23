package com.novaTradeHub.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.novaTradeHub.domain.WalletTransactionType;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.Wallet;
import com.novaTradeHub.models.WalletTransaction;
import com.novaTradeHub.repository.WalletTransactionRepository;

@Service
public class WalletTransactionServiceImpl implements WalletTransactionService {

	@Autowired
	private WalletTransactionRepository repository;

	@Override
	public List<WalletTransaction> getTransactionsByWallet(Wallet wallet) {
		List<WalletTransaction> walletTransactions = repository.findAllByWalletId(wallet.getId());
		return walletTransactions;
	}

	@Override
	public List<WalletTransaction> getTransactionsByUserId(User user) {
		List<WalletTransaction> walletTransactions = repository.findAllByUserId(user.getId());
		return walletTransactions;
	}

	@Override
	public WalletTransaction createTransaction(Wallet wallet, String purpose,
			WalletTransactionType walletTransactionType, String transferId, double amount, User user) {
		WalletTransaction walletTransaction = new WalletTransaction();
		walletTransaction.setAmount(amount);
		walletTransaction.setPurpose(purpose);
		walletTransaction.setTransferId(transferId);
		walletTransaction.setDate(LocalDate.now());
		walletTransaction.setWallet(wallet);
		walletTransaction.setWalletTransactionType(walletTransactionType);
		walletTransaction.setUser(user);
		return repository.save(walletTransaction);
	}

	@Override
	public List<WalletTransaction> getAllTransactions() {
		
		return repository.findAll();
	}

}
