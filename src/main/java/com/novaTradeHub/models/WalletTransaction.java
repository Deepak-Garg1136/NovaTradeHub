package com.novaTradeHub.models;

import java.time.LocalDate;

import com.novaTradeHub.domain.WalletTransactionType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class WalletTransaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Wallet wallet;

	private WalletTransactionType walletTransactionType;

	private LocalDate date;

	private String transferId; // transferId is which wallet we want to transfer, if we buy or sell transfer id
								// is null

	private String purpose;

	private double amount;

	@ManyToOne
	private User user;
}
