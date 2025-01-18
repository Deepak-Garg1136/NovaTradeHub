package com.novaTradeHub.request;

import com.novaTradeHub.domain.OrderType;

import lombok.Data;

@Data
public class CreateOrderRequest {

	private String coinId;
	private double quantity;
	private OrderType orderType;
}
