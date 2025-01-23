package com.novaTradeHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.novaTradeHub.models.Coin;

@Repository
public interface CoinRepository extends JpaRepository<Coin, String> {
//	Coin findByUserId(Long userId);

}
