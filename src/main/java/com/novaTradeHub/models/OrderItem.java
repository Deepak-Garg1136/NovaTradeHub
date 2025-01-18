package com.novaTradeHub.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class OrderItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private double quantity;

	@ManyToOne
	private Coin coin;

	private double buyPrice;

	private double sellprice;

	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "order_id")
	private Order order;
}
