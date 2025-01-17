package com.novaTradeHub.utils;

import java.util.Random;

public class OtpUtils {

	public static String generateOtp() {
		int otpLength = 6;

		Random random = new Random();

		StringBuilder otpBuilder = new StringBuilder(otpLength);

		for (int i = 0; i < otpLength; i++) {
			otpBuilder.append(random.nextInt(10));
		}
		return otpBuilder.toString();
	}
}
