package com.novaTradeHub.request;

import com.novaTradeHub.domain.VerificationType;

import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {

	private String email;
	private String sendTo;
	private VerificationType verificationType;
}
