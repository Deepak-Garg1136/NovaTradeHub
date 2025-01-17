package com.novaTradeHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.novaTradeHub.models.TwoFactorOTP;

@Repository
public interface TwoFactorOtpRepository extends JpaRepository<TwoFactorOTP, String> {
	TwoFactorOTP findByUserId(Long userId);
}

//The method name follows Spring Data JPA's naming conventions, so it automatically generates a query to retrieve the entity based on the userId.