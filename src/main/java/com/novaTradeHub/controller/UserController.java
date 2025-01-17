package com.novaTradeHub.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novaTradeHub.domain.VerificationType;
import com.novaTradeHub.models.ForgotPasswordToken;
import com.novaTradeHub.models.User;
import com.novaTradeHub.models.VerificationCode;
import com.novaTradeHub.request.ForgotPasswordTokenRequest;
import com.novaTradeHub.request.ResetPasswordRequest;
import com.novaTradeHub.response.ApiResponse;
import com.novaTradeHub.response.AuthResponse;
import com.novaTradeHub.service.EmailService;
import com.novaTradeHub.service.ForgotPasswordService;
import com.novaTradeHub.service.UserService;
import com.novaTradeHub.service.VerificationCodeService;
import com.novaTradeHub.utils.OtpUtils;

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private VerificationCodeService verificationCodeService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private ForgotPasswordService forgotPasswordService;

	@GetMapping("/api/users/profile")
	public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);

		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@PostMapping("/api/users/verification/{verificationType}/send-otp")
	public ResponseEntity<String> sendVerificationOtp(@RequestHeader("Authorization") String jwt,
			@PathVariable VerificationType verificationType) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);

		VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

		if (verificationCode == null) {
			verificationCode = verificationCodeService.sendVerificationCode(user, verificationType);
		}

		if (verificationType.equals(VerificationType.EMAIL)) {
			emailService.sendVerificationOtpEmail(verificationCode.getEmail(), verificationCode.getOtp());
		}
		return new ResponseEntity<>("OTP sent succefully", HttpStatus.OK);
	}

	@PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
	public ResponseEntity<User> enableTwoFactorAuthentication(@RequestHeader("Authorization") String jwt,
			@PathVariable String otp) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

		String sendTo = verificationCode.getVerificationType().equals(VerificationType.EMAIL)
				? verificationCode.getEmail()
				: verificationCode.getMobile();
		boolean isVerified = verificationCode.getOtp().equals(otp);

		if (isVerified) {
			User updatedUser = userService.enableTwoFactorAuthentication(verificationCode.getVerificationType(), sendTo,
					user);
			verificationCodeService.deleteVerficationCode(verificationCode);

			return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
		}
		throw new Exception("Invalid Otp");
	}

	@PostMapping("/auth/users/reset-password/send-otp")
	public ResponseEntity<AuthResponse> sendResendPasswordOtp(
			@RequestBody ForgotPasswordTokenRequest forgotPasswordTokenRequest) throws Exception {
		User user = userService.findUserByEmail(forgotPasswordTokenRequest.getEmail());

		String otp = OtpUtils.generateOtp();
		UUID uuid = UUID.randomUUID();
		String id = uuid.toString();

		ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());

		if (token == null) {
			forgotPasswordService.createToken(user, id, otp, forgotPasswordTokenRequest.getVerificationType(),
					forgotPasswordTokenRequest.getSendTo());
		}

		if (forgotPasswordTokenRequest.getVerificationType().equals(VerificationType.EMAIL)) {
			emailService.sendVerificationOtpEmail(user.getEmail(), token.getOtp());
		}

		AuthResponse response = new AuthResponse();
		response.setSession(token.getId());
		response.setMessage("OTP sent successfully");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PatchMapping("/auth/users/reset-password/verify-otp")
	public ResponseEntity<ApiResponse> resetPassword(@RequestHeader("Authorization") String jwt,
			@RequestParam String id, @RequestBody ResetPasswordRequest request) throws Exception {
		ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findById(id);

		boolean isVerified = forgotPasswordToken.getOtp().equals(request.getOtp());

		if (isVerified) {
			userService.updatePasword(forgotPasswordToken.getUser(), request.getPassword());

			ApiResponse apiResponse = new ApiResponse();
			apiResponse.setMessage("Password update successfully");
			return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
		}
		throw new Exception("Invalid Otp");
	}

}
