package com.novaTradeHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.novaTradeHub.models.VerificationCode;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
	public VerificationCode findByUserId(Long userId);
}

//The method name follows Spring Data JPA's naming conventions, so it automatically generates a query to retrieve the entity based on the userId.