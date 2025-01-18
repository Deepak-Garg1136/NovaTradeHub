package com.novaTradeHub.service;

import java.util.List;

import com.novaTradeHub.domain.OrderType;
import com.novaTradeHub.models.Coin;
import com.novaTradeHub.models.Order;
import com.novaTradeHub.models.OrderItem;
import com.novaTradeHub.models.User;

public interface OrderService {
	Order createOrder(User user, OrderItem orderItem, OrderType orderType);

	Order getOrderById(Long orderId) throws Exception;

	List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol);

	Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;
}
