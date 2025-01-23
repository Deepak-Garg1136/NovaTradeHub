package com.novaTradeHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.novaTradeHub.models.WatchList;

@Repository
public interface WatchListRepository extends JpaRepository<WatchList, Long> {
	WatchList findByUserId(Long userId);
}
