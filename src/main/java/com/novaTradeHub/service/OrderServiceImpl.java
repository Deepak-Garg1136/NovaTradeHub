package com.novaTradeHub.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.novaTradeHub.domain.OrderStatus;
import com.novaTradeHub.domain.OrderType;
import com.novaTradeHub.models.Asset;
import com.novaTradeHub.models.Coin;
import com.novaTradeHub.models.Order;
import com.novaTradeHub.models.OrderItem;
import com.novaTradeHub.models.User;
import com.novaTradeHub.repository.OrderItemRepository;
import com.novaTradeHub.repository.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepository repository;

	@Autowired
	private WalletService walletService;

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Autowired
	private AssetService assetService;

	@Override
	public Order createOrder(User user, OrderItem orderItem, OrderType orderType) {
		double price = orderItem.getCoin().getCurrentPrice() * orderItem.getQuantity();
		Order order = new Order();
		order.setUser(user);
		order.setOrderItem(orderItem);
		order.setOrderType(orderType);
		order.setPrice(BigDecimal.valueOf(price));
		order.setTimeStamp(LocalDateTime.now());
		order.setStatus(OrderStatus.PENDING);
		return repository.save(order);
	}

	@Override
	public Order getOrderById(Long orderId) throws Exception {
		Optional<Order> order = repository.findById(orderId);
		if (order.isEmpty()) {
			throw new Exception("Order not found");
		}
		return order.get();
	}

	@Override
	public List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol) {
		return repository.findByUserId(userId);
	}

	private OrderItem createOrderItem(Coin coin, double quantity, double buyPrice, double sellPrice) {
		OrderItem orderItem = new OrderItem();
		orderItem.setBuyPrice(buyPrice);
		orderItem.setCoin(coin);
		orderItem.setQuantity(quantity);
		orderItem.setSellprice(sellPrice);

		return orderItemRepository.save(orderItem);
	}

	@Transactional
	public Order buyAsset(Coin coin, double quantity, User user) throws Exception {
		if (quantity <= 0) {
			throw new Exception("Quantity should be greator then 0");
		}

		double buyPrice = coin.getCurrentPrice();
		OrderItem orderItem = createOrderItem(coin, quantity, buyPrice, 0);
		Order order = createOrder(user, orderItem, OrderType.BUY);
		orderItem.setOrder(order);
		walletService.payOrderPayment(order, user);
		order.setStatus(OrderStatus.SUCCESS);
		order.setOrderType(OrderType.BUY);

		Order savedOrder = repository.save(order);

		// need to create the assets
		Asset oldAsset = assetService.findAssetByUserIdAndCoinId(order.getUser().getId(),
				order.getOrderItem().getCoin().getId());

		if (oldAsset == null) {
			assetService.createAsset(user, orderItem.getCoin(), orderItem.getQuantity());
		} else {
			assetService.updateAsset(oldAsset.getId(), quantity);
		}
		return savedOrder;
	}

	@Transactional
	public Order sellAsset(Coin coin, double quantity, User user) throws Exception {
		if (quantity <= 0) {
			throw new Exception("Quantity should be greator then 0");
		}

		double sellPrice = coin.getCurrentPrice();

		Asset assetToSell = assetService.findAssetByUserIdAndCoinId(user.getId(), coin.getId());
		if (assetToSell != null) {
			double buyPrice = assetToSell.getBuyPrice();
			OrderItem orderItem = createOrderItem(coin, quantity, buyPrice, sellPrice);
			Order order = createOrder(user, orderItem, OrderType.SELL);
			orderItem.setOrder(order);

			if (assetToSell.getQuantity() >= quantity) {
				order.setStatus(OrderStatus.SUCCESS);
				order.setOrderType(OrderType.SELL);
				Order savedOrder = repository.save(order);
				walletService.payOrderPayment(savedOrder, user);

				Asset updatedAsset = assetService.updateAsset(assetToSell.getId(), -quantity);

				if (updatedAsset.getQuantity() * coin.getCurrentPrice() <= 1) {
					assetService.deleteAsset(updatedAsset.getId());
				}
				return savedOrder;
			}
			throw new Exception("Insufficient Asset to sell");
		}
		throw new Exception("Asset not found");
	}

	@Override
	@Transactional
	public Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception {
		if (orderType.equals(OrderType.BUY)) {
			return buyAsset(coin, quantity, user);
		}

		else if (orderType.equals(OrderType.SELL)) {
			return sellAsset(coin, quantity, user);
		}

		throw new Exception("Invalid order type");
	}

}
