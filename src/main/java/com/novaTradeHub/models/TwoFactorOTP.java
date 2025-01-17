package com.novaTradeHub.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

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
public class TwoFactorOTP {
	@Id
	private String id;

	private String otp;

	@OneToOne
	@JsonProperty(access = Access.WRITE_ONLY)
	private User user;

	@JsonProperty(access = Access.WRITE_ONLY)
	private String jwt;
}
