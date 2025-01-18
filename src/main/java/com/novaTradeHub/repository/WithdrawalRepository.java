package com.novaTradeHub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.novaTradeHub.models.Withdrawal;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long> {
	List<Withdrawal> findByUserId(Long userId);
}
