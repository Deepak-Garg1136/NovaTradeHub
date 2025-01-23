package com.novaTradeHub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.novaTradeHub.models.Coin;
import com.novaTradeHub.repository.CoinRepository;

@Service
public class CoinServiceImpl implements CoinService {

	@Autowired
	private CoinRepository repository;

	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public List<Coin> getCoinList(int page) throws Exception {
		String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=" + page;

		RestTemplate restTemplate = new RestTemplate();

		try {
			HttpHeaders headers = new HttpHeaders();
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
			List<Coin> coinList = objectMapper.readValue(response.getBody(), new TypeReference<List<Coin>>() {
			});
			return coinList;
		} catch (HttpClientErrorException | HttpServerErrorException e) {
			throw new Exception(e.getMessage());
		}

	}

	@Override
	public String getMarketChart(String coinId, int days) throws Exception {
		String url = "https://api.coingecko.com/api/v3/coins/" + coinId + "/market_chart?vs_currency=usd&days=10&page="
				+ days;

		RestTemplate restTemplate = new RestTemplate();

		try {
			HttpHeaders headers = new HttpHeaders();
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

			return response.getBody();
		} catch (HttpClientErrorException | HttpServerErrorException e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public String getCoinDetails(String coinId) throws Exception {
		String url = "https://api.coingecko.com/api/v3/coins/" + coinId;
		RestTemplate restTemplate = new RestTemplate();

		try {
			HttpHeaders headers = new HttpHeaders();
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

			JsonNode rootNode = objectMapper.readTree(responseEntity.getBody());

			Coin coin = new Coin();
			coin.setId(rootNode.get("id").asText());
			coin.setName(rootNode.get("name").asText());
			coin.setSymbol(rootNode.get("symbol").asText());
			coin.setImage(rootNode.get("image").get("large").asText());

			JsonNode marketNode = rootNode.get("market_data");
			coin.setCurrentPrice(marketNode.get("current_price").get("usd").asDouble());
			coin.setMarketCap(marketNode.get("market_cap").get("usd").asLong());
			coin.setMarketCapRank(marketNode.get("market_cap_rank").asInt());
			coin.setTotalVolume(marketNode.get("total_volume").get("usd").asLong());
			coin.setHigh24h(marketNode.get("high_24h").get("usd").asDouble());
			coin.setLow24h(marketNode.get("low_24h").get("usd").asDouble());
			coin.setPriceChange24h(marketNode.get("price_change_24h").asDouble());
			coin.setPriceChangePercentage24h(marketNode.get("price_change_percentage_24h").asDouble());
			coin.setMarketCapChange24h(marketNode.get("market_cap_change_24h").asLong());
			coin.setMarketCapChangePercentage24h(marketNode.get("market_cap_change_percentage_24h").asLong());
			coin.setTotalSupply(marketNode.get("total_supply").asLong());

			repository.save(coin);

			return responseEntity.getBody();
		} catch (HttpClientErrorException | HttpServerErrorException e) {
			System.out.println(e.getMessage());
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public Coin findById(String coinId) throws Exception {
		Optional<Coin> coin = repository.findById(coinId);
		if (coin.isEmpty()) {
			throw new Exception("coin not found");
		}
		return coin.get();
	}

	@Override
	public String searchCoin(String keyword) throws Exception {
		String url = "https://api.coingecko.com/api/v3/search?query=/" + keyword;

		RestTemplate restTemplate = new RestTemplate();

		try {
			HttpHeaders headers = new HttpHeaders();
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

			return response.getBody();
		} catch (HttpClientErrorException | HttpServerErrorException e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public String getTop50CoinsByMarketCapRank() throws Exception {
		String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";

		RestTemplate restTemplate = new RestTemplate();

		try {
			HttpHeaders headers = new HttpHeaders();
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

			return response.getBody();
		} catch (HttpClientErrorException | HttpServerErrorException e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public String getTrendingCoins() throws Exception {
		String url = "https://api.coingecko.com/api/v3/search/trending";

		RestTemplate restTemplate = new RestTemplate();

		try {
			HttpHeaders headers = new HttpHeaders();
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

			return response.getBody();
		} catch (HttpClientErrorException | HttpServerErrorException e) {
			throw new Exception(e.getMessage());
		}
	}

}
