package com.novaTradeHub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novaTradeHub.config.JwtProvider;
import com.novaTradeHub.models.TwoFactorOTP;
import com.novaTradeHub.models.User;
import com.novaTradeHub.repository.UserRepository;
import com.novaTradeHub.response.AuthResponse;
import com.novaTradeHub.service.CustomUserDetailsService;
import com.novaTradeHub.service.EmailService;
import com.novaTradeHub.service.TwoFactorOtpService;
import com.novaTradeHub.utils.OtpUtils;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository repository;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private TwoFactorOtpService twoFactorOtpService;

	@Autowired
	private EmailService emailService;

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception {

		User isExistUser = repository.findByEmail(user.getEmail());
		System.out.println(isExistUser);

		if (isExistUser != null) {
			throw new Exception("User already exists");
		}

		User newUser = new User();
		newUser.setFullName(user.getFullName());
		newUser.setEmail(user.getEmail());
		newUser.setPassword(user.getPassword());
		User savedUser = repository.save(newUser);

		Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = JwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(jwt);
		authResponse.setStatus(true);
		authResponse.setMessage("Register Success");

		return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {

		String userName = user.getEmail();
		String password = user.getPassword();

		Authentication authentication = authenticate(userName, password);

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = JwtProvider.generateToken(authentication);

		User user2 = repository.findByEmail(userName);

		if (user.getTwoFactorAuth().isEnabled()) {
			AuthResponse response = new AuthResponse();
			response.setMessage("Two factor auth is enabled");
			response.setTwoFactorAuthEnabled(true);
			String otp = OtpUtils.generateOtp();
			TwoFactorOTP oldTwoFactorOTP = twoFactorOtpService.findByUser(user2.getId());

			if (oldTwoFactorOTP != null) {
				twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOTP);
			}
			TwoFactorOTP newTwoFactorOTP = twoFactorOtpService.createTwoFactorOTP(user2, otp, jwt);
			emailService.sendVerificationOtpEmail(userName, otp);
			response.setSession(newTwoFactorOTP.getId());
			return new ResponseEntity<AuthResponse>(response, HttpStatus.ACCEPTED);
		}

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(jwt);
		authResponse.setStatus(true);
		authResponse.setMessage("Login Success");

		return new ResponseEntity<>(authResponse, HttpStatus.OK);

	}

	private Authentication authenticate(String userName, String password) throws Exception {

		UserDetails userDetails = customUserDetailsService.loadUserByUsername(userName);
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username or password");
		}

		if (!password.equals(userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid username or password");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
	}

	@PostMapping("/two-factor/otp/{otp}")
	public ResponseEntity<AuthResponse> verifySigninOtp(@PathVariable String otp, @RequestParam String id) {
		TwoFactorOTP twoFactorOTP = twoFactorOtpService.findById(id);

		if (twoFactorOtpService.verifyTwoFactorOtp(twoFactorOTP, otp)) {
			AuthResponse authResponse = new AuthResponse();
			authResponse.setJwt(twoFactorOTP.getJwt());
			authResponse.setMessage("Two Factor authentication verified");
			authResponse.setTwoFactorAuthEnabled(true);

			return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
		}
		throw new BadCredentialsException("Invalid Otp");
	}
}
