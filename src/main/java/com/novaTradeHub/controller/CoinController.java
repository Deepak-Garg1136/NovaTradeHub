package com.novaTradeHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.novaTradeHub.models.Coin;
import com.novaTradeHub.service.CoinService;

@RestController
@RequestMapping("/coins")
public class CoinController {
	@Autowired
	private CoinService coinService;

	@Autowired
	private ObjectMapper objectMapper;

	@GetMapping()
	ResponseEntity<List<Coin>> getCoinList(@RequestParam(required = false) int page) throws Exception {
		List<Coin> list = coinService.getCoinList(page);
		return new ResponseEntity<List<Coin>>(list, HttpStatus.OK);
	}

	@GetMapping("/{coinId}/chart")
	ResponseEntity<JsonNode> getMarketChart(@PathVariable String coinId, @RequestParam("days") int days)
			throws Exception {
		String marketChart = coinService.getMarketChart(coinId, days);

		JsonNode jsonNode = objectMapper.readTree(marketChart);

		return new ResponseEntity<>(jsonNode, HttpStatus.OK);
	}

	@GetMapping("/search")
	ResponseEntity<JsonNode> searchCoin(@RequestParam("q") String keyword) throws Exception {
		String coin = coinService.searchCoin(keyword);

		JsonNode jsonNode = objectMapper.readTree(coin);

		return new ResponseEntity<>(jsonNode, HttpStatus.OK);
	}

	@GetMapping("/top50")
	ResponseEntity<JsonNode> getTop50CoinByMarketCapRank() throws Exception {
		String coin = coinService.getTop50CoinsByMarketCapRank();

		JsonNode jsonNode = objectMapper.readTree(coin);

		return new ResponseEntity<>(jsonNode, HttpStatus.OK);
	}

	@GetMapping("/trending")
	ResponseEntity<JsonNode> getTrendingCoin() throws Exception {
		String coin = coinService.getTrendingCoins();

		JsonNode jsonNode = objectMapper.readTree(coin);

		return new ResponseEntity<>(jsonNode, HttpStatus.OK);
	}

	@GetMapping("/details/{coinId}")
	ResponseEntity<JsonNode> getCoinDetails(@PathVariable String coinId) throws Exception {
		String coin = coinService.getCoinDetails(coinId);

		JsonNode jsonNode = objectMapper.readTree(coin);

		return new ResponseEntity<>(jsonNode, HttpStatus.OK);
	}
}
