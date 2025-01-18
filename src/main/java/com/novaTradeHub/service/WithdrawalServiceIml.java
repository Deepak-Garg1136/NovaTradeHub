package com.novaTradeHub.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.novaTradeHub.domain.WithdrawalStatus;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.Withdrawal;
import com.novaTradeHub.repository.WithdrawalRepository;

@Service
public class WithdrawalServiceIml implements WithdrawalService {

	@Autowired
	private WithdrawalRepository repository;

	@Override
	public Withdrawal requestWithdrawal(long amount, User user) {
		Withdrawal withdrawal = new Withdrawal();
		withdrawal.setAmount(amount);
		withdrawal.setUser(user);
		withdrawal.setStatus(WithdrawalStatus.PENDING);
		return repository.save(withdrawal);
	}

	@Override
	public Withdrawal proccedWithdrawal(Long withdrawalId, boolean accept) throws Exception {
		Optional<Withdrawal> withdrawal = repository.findById(withdrawalId);
		if (withdrawal.isEmpty()) {
			throw new Exception("WIthdrawal not found");
		}

		Withdrawal withdrawal2 = withdrawal.get();
		withdrawal2.setDate(LocalDateTime.now());

		if (accept) {
			withdrawal2.setStatus(WithdrawalStatus.SUCCESS);
		} else {
			withdrawal2.setStatus(WithdrawalStatus.DECLINE);
		}
		return repository.save(withdrawal2);
	}

	@Override
	public List<Withdrawal> getUserWithdrawalHistory(User user) {
		return repository.findByUserId(user.getId());
	}

	@Override
	public List<Withdrawal> getAllWithdrawalRequest() {
		return repository.findAll();
	}

}
