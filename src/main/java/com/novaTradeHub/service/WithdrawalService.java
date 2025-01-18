package com.novaTradeHub.service;

import java.util.List;

import com.novaTradeHub.models.User;
import com.novaTradeHub.models.Withdrawal;

public interface WithdrawalService {

	Withdrawal requestWithdrawal(long amount, User user);

	Withdrawal proccedWithdrawal(Long withdrawalId, boolean accept) throws Exception;

	List<Withdrawal> getUserWithdrawalHistory(User user);

	List<Withdrawal> getAllWithdrawalRequest();
}
