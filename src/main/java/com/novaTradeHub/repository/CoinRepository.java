package com.novaTradeHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.novaTradeHub.models.Coin;

public interface CoinRepository extends JpaRepository<Coin, String> {
//	Coin findByUserId(Long userId);

}
