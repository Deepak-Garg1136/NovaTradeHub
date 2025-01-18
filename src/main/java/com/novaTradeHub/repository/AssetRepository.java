package com.novaTradeHub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.novaTradeHub.models.Asset;

public interface AssetRepository extends JpaRepository<Asset, Long> {
	List<Asset> findByUserId(Long userId);

	Asset findByUserIdAndCoinId(Long userId, String coinId);
}
