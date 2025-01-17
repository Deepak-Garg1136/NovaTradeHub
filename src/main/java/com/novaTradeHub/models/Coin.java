package com.novaTradeHub.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coin {

	@Id
	private String id; // Unique ID, e.g., "bitcoin"

	private String symbol; // Short symbol, e.g., "btc"

	private String name; // Name, e.g., "Bitcoin"

	private String image; // URL to the image

	@JsonProperty("current_price")
	private double currentPrice; // Current price

	@JsonProperty("market_cap")
	private long marketCap; // Market capitalization

	@JsonProperty("market_cap_rank")
	private int marketCapRank; // Rank by market capitalization

	@JsonProperty("fully_diluted_valuation")
	private long fullyDilutedValuation; // Fully diluted valuation

	@JsonProperty("total_volume")
	private long totalVolume; // Total trading volume

	@JsonProperty("high_24h")
	private double high24h; // 24-hour high price

	@JsonProperty("low_24h")
	private double low24h; // 24-hour low price

	@JsonProperty("price_change_24h")
	private double priceChange24h; // Price change in the last 24 hours

	@JsonProperty("price_change_percentage_24h")
	private double priceChangePercentage24h; // Percentage price change in 24 hours

	@JsonProperty("market_cap_change_24h")
	private long marketCapChange24h; // Market cap change in the last 24 hours

	@JsonProperty("market_cap_change_percentage_24h")
	private long marketCapChangePercentage24h; // Market cap percentage change in 24 hours

	@JsonProperty("circulating_supply")
	private long circulatingSupply; // Circulating supply

	@JsonProperty("total_supply")
	private long totalSupply; // Total supply

	@JsonProperty("max_supply")
	private long maxSupply; // Maximum supply

	private double ath; // All-time high price

	@JsonProperty("ath_change_percentage")
	private double athChangePercentage; // All-time high change percentage

	private Date athDate; // Date of the all-time high price (as ISO String)

	private double atl; // All-time low price

	@JsonProperty("atl_change_percentage")
	private double atlChangePercentage; // All-time low change percentage

	private Date atlDate; // Date of the all-time low price (as ISO String)

	@JsonIgnore
	private Double roi; // Return on investment (nullable)

	@JsonProperty("last_updated")
	private Date lastUpdated; // Last updated timestamp (as ISO String)

}