package com.novaTradeHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.novaTradeHub.models.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
