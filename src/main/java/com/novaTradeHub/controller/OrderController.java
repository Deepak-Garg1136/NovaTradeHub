package com.novaTradeHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novaTradeHub.domain.OrderStatus;
import com.novaTradeHub.domain.OrderType;
import com.novaTradeHub.domain.WalletTransactionType;
import com.novaTradeHub.models.Coin;
import com.novaTradeHub.models.Order;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.Wallet;
import com.novaTradeHub.request.CreateOrderRequest;
import com.novaTradeHub.service.CoinService;
import com.novaTradeHub.service.OrderService;
import com.novaTradeHub.service.UserService;
import com.novaTradeHub.service.WalletService;
import com.novaTradeHub.service.WalletTransactionService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserService userService;

	@Autowired
	private CoinService coinService;

	@Autowired
	private WalletTransactionService walletTransactionService;

	@Autowired
	private WalletService walletService;

	@PostMapping("/pay")
	public ResponseEntity<Order> payOrderPayment(@RequestHeader("Authorization") String jwt,
			@RequestBody CreateOrderRequest createOrderRequest) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Coin coin = coinService.findById(createOrderRequest.getCoinId());
		Order order = orderService.processOrder(coin, createOrderRequest.getQuantity(),
				createOrderRequest.getOrderType(), user);
		if (order.getStatus().equals(OrderStatus.SUCCESS)) {
			Wallet wallet = walletService.getUserWallet(user);
			if (order.getOrderType().equals(OrderType.BUY)) {
				walletTransactionService.createTransaction(wallet, "Buying " + coin.getId(),
						WalletTransactionType.BUY_ASSET, null,
						order.getOrderItem().getBuyPrice() * order.getOrderItem().getQuantity(), user);
			} else {
				walletTransactionService.createTransaction(wallet, "Selling " + coin.getId(),
						WalletTransactionType.SELL_ASSET, null,
						order.getOrderItem().getBuyPrice() * order.getOrderItem().getQuantity(), user);
			}
		}
		return ResponseEntity.ok(order);

	}

	@GetMapping("/{orderId}")
	public ResponseEntity<Order> getOrderById(@RequestHeader("Authorization") String jwt, @PathVariable Long orderId)
			throws Exception {
		if (jwt == null) {
			throw new Exception("token missing");
		}
		User user = userService.findUserProfileByJwt(jwt);
		Order order = orderService.getOrderById(orderId);

		if (order.getUser().getId().equals(order.getId())) {
			return ResponseEntity.ok(order);

		} else {
			throw new Exception("You don't have access");
		}
	}

	@GetMapping()
	public ResponseEntity<List<Order>> getAllOrdersForUser(@RequestHeader("Authorization") String jwt,
			@RequestParam(required = false) OrderType order_type, @RequestParam(required = false) String asset_symbol)
			throws Exception {

		Long userId = userService.findUserProfileByJwt(jwt).getId();
		List<Order> userOrders = orderService.getAllOrdersOfUser(userId, order_type, asset_symbol);
		return ResponseEntity.ok(userOrders);
	}
}
