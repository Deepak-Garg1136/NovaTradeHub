package com.novaTradeHub.models;

import java.time.LocalDateTime;

import com.novaTradeHub.domain.WithdrawalStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Withdrawal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private WithdrawalStatus status;

	private long amount;

	@ManyToOne
	private User user;

	private LocalDateTime date = LocalDateTime.now();
}
