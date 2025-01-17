package com.novaTradeHub.service;

import com.novaTradeHub.models.Order;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.Wallet;

public interface WalletService {

	Wallet getUserWallet(User user);

	Wallet addBalance(Wallet wallet, Long amount);

	Wallet findWalletById(Long id);

	Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount);

	Wallet payOrderPayment(Order order, User user);

}
