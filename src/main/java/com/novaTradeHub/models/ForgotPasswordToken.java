package com.novaTradeHub.models;

import com.novaTradeHub.domain.VerificationType;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPasswordToken {

	@Id

	private String id;

	@OneToOne
	private User user;

	private String otp;

	private VerificationType verificationType;

	private String sendTo;
}
