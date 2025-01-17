package com.novaTradeHub.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@GetMapping("home")
	public String putMethodName() {
		// TODO: process PUT request

		return "Welcome to the home page";
	}
}
