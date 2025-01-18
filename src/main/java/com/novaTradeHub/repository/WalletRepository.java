package com.novaTradeHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.novaTradeHub.models.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Long> {

	public Wallet findByUserId(Long userId);
}
