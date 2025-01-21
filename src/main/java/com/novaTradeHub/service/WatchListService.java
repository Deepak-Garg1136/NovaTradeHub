package com.novaTradeHub.service;

import com.novaTradeHub.models.Coin;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.WatchList;

public interface WatchListService {

	WatchList findUserWatchList(Long userId) throws Exception;

	WatchList createWatchList(User user);

	WatchList findById(Long id) throws Exception;

	Coin addItemToWatchList(Coin coin, User user) throws Exception;
}
