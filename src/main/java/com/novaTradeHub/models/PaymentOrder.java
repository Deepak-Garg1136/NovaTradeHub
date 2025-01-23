package com.novaTradeHub.models;

import com.novaTradeHub.domain.PaymentMethod;
import com.novaTradeHub.domain.PaymentOrderStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private long amount;

	private PaymentOrderStatus status;

	private PaymentMethod paymentMethod;

	@ManyToOne
	private User user;

}
