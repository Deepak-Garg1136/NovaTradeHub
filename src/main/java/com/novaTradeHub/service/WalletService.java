package com.novaTradeHub.service;

import com.novaTradeHub.models.Order;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.Wallet;

public interface WalletService {

	Wallet getUserWallet(User user);

	Wallet addBalance(Wallet wallet, Long amount);

	Wallet findWalletById(Long id) throws Exception;

	Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception;

	Wallet payOrderPayment(Order order, User user) throws Exception;

}
