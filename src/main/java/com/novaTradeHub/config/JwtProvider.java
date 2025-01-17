package com.novaTradeHub.config;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {

	public static final SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRETE_KEY.getBytes());

	public static String generateToken(Authentication authentication) {
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		String roles = populateAuthorities(authorities);

		String jwtToken = Jwts.builder().setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + 86400000)).claim("email", authentication.getName())
				.claim("authorities", roles).signWith(key).compact();
		return jwtToken;
	}

	public static String getEmailFromJwtToken(String token) {
		token = token.substring(7);

		// Parse the JWT token to extract its claims (payload data).
		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();

		// Extract the email and authorities from the claims.
		String email = String.valueOf(claims.get("email"));

		return email;
	}

	private static String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {

		Set<String> auth = new HashSet<String>();
		for (GrantedAuthority gAuthority : authorities) {
			auth.add(gAuthority.getAuthority());
		}
		return String.join(",", auth);
	}

}
