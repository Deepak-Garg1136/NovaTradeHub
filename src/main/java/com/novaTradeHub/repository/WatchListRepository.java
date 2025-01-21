package com.novaTradeHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.novaTradeHub.models.WatchList;

public interface WatchListRepository extends JpaRepository<WatchList, Long> {
	WatchList findByUserId(Long userId);
}
