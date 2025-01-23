package com.novaTradeHub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novaTradeHub.models.Coin;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.WatchList;
import com.novaTradeHub.service.CoinService;
import com.novaTradeHub.service.UserService;
import com.novaTradeHub.service.WatchListService;

@RestController
@RequestMapping("/api/watchlist")
public class WatchListController {

	@Autowired
	private WatchListService watchListService;

	@Autowired
	private UserService userService;

	@Autowired
	private CoinService coinService;

	@GetMapping("/user")
	public ResponseEntity<WatchList> getUserWatchList(@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		WatchList watchList = watchListService.findUserWatchList(user.getId());
		return new ResponseEntity<>(watchList, HttpStatus.OK);
	}

//	@PostMapping("/create")
//	public ResponseEntity<WatchList> createWatchList(@RequestHeader("Authorization") String jwt) throws Exception {
//		User user = userService.findUserProfileByJwt(jwt);
//
//		WatchList watchList = watchListService.createWatchList(user)
//		return new ResponseEntity<>(watchList, HttpStatus.OK);
//	}

	@GetMapping("/{watchListId}")
	public ResponseEntity<WatchList> getWatchListById(@PathVariable Long watchListId) throws Exception {
		WatchList watchList = watchListService.findById(watchListId);
		return new ResponseEntity<>(watchList, HttpStatus.OK);
	}

	@PatchMapping("/add/coin/{coinId}")
	public ResponseEntity<Coin> addItemToWatchList(@RequestHeader("Authorization") String jwt,
			@PathVariable String coinId) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		System.out.println(coinId);
		Coin coin = coinService.findById(coinId);
		System.out.println(coin);
		Coin newCoin = watchListService.addItemToWatchList(coin, user);
		return new ResponseEntity<>(newCoin, HttpStatus.OK);
	}
}
