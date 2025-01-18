package com.novaTradeHub.service;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.novaTradeHub.domain.OrderType;
import com.novaTradeHub.models.Order;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.Wallet;
import com.novaTradeHub.repository.WalletRepository;

@Service
public class WalletServiceImpl implements WalletService {

	@Autowired
	private WalletRepository repository;

	@Override
	public Wallet getUserWallet(User user) {
		Wallet wallet = repository.findByUserId(user.getId());
		if (wallet == null) {
			wallet = new Wallet();
			wallet.setUser(user);
		}
		return wallet;
	}

	@Override
	public Wallet addBalance(Wallet wallet, Long amount) {
		BigDecimal balance = wallet.getBalance();
		BigDecimal newBalance = balance.add(BigDecimal.valueOf(amount));
		wallet.setBalance(newBalance);
		return repository.save(wallet);

	}

	@Override
	public Wallet findWalletById(Long id) throws Exception {
		Optional<Wallet> wallet = repository.findById(id);
		if (!wallet.isPresent()) {
			throw new Exception("Wallet not found");
		}
		return wallet.get();
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception {
		Wallet senderWallet = getUserWallet(sender);
		if (senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
			throw new Exception("Insufficient Balance");
		}
		BigDecimal senderBalance = senderWallet.getBalance().subtract(BigDecimal.valueOf(amount));
		senderWallet.setBalance(senderBalance);
		repository.save(senderWallet);

		BigDecimal receiverBalance = receiverWallet.getBalance().add(BigDecimal.valueOf(amount));
		receiverWallet.setBalance(receiverBalance);
		repository.save(receiverWallet);
		return senderWallet;
	}

	@Override
	public Wallet payOrderPayment(Order order, User user) throws Exception {
		Wallet wallet = getUserWallet(user);

		if (order.getOrderType().equals(OrderType.BUY)) {
			BigDecimal newBalance = wallet.getBalance().subtract(order.getPrice());
			if (newBalance.compareTo(order.getPrice()) < 0) {
				throw new Exception("Insufficient Balance");
			}
			wallet.setBalance(newBalance);
		}

		else {
			BigDecimal newBalance = wallet.getBalance().add(order.getPrice());
			wallet.setBalance(newBalance);
		}
		return repository.save(wallet);

	}

}
