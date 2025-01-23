package com.novaTradeHub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.novaTradeHub.models.WalletTransaction;

@Repository
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
	List<WalletTransaction> findAllByWalletId(Long walletId);

	List<WalletTransaction> findAllByUserId(Long userId);

}
