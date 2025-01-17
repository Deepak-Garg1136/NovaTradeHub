package com.novaTradeHub.models;

import org.springframework.stereotype.Component;

import com.novaTradeHub.domain.VerificationType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class TwoFactorAuth {
	private boolean isEnabled = false;
	private VerificationType sendTo;
}
