package com.novaTradeHub.config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidator extends OncePerRequestFilter {

	/**
	 * This method intercepts every HTTP request and processes the JWT token from
	 * the header.
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// Extract the JWT token from the "Authorization" header.
		String jwt = request.getHeader(JwtConstant.JWT_HEADER);

		if (jwt != null) { // Check if the token is present.
			// Remove the "Bearer " prefix from the token to extract the actual JWT.
			jwt = jwt.substring(7);
			try {
				// Create a SecretKey using the secret key defined in JwtConstant.
				SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRETE_KEY.getBytes());

				// Parse the JWT token to extract its claims (payload data).
				Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

				// Extract the email and authorities from the claims.
				String email = String.valueOf(claims.get("email"));
				String authorities = String.valueOf(claims.get("authorities"));

				// Convert the authorities (comma-separated string) into a list of
				// GrantedAuthority objects.
				List<GrantedAuthority> authoritiesList = AuthorityUtils
						.commaSeparatedStringToAuthorityList(authorities);

				// Create an Authentication object with the email and authorities.
				Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authoritiesList);

				// Set the Authentication object in the SecurityContext, making it available for
				// the current request.
				SecurityContextHolder.getContext().setAuthentication(authentication);
			} catch (Exception e) {
				// Handle any exceptions during token validation, such as invalid or expired
				// tokens.
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Set HTTP status to 401 Unauthorized.
				response.getWriter().write("Invalid Token"); // Write an error message to the response.
				return; // Stop further processing of the request.
			}
		}

		// Proceed with the filter chain, allowing the request to continue.
		filterChain.doFilter(request, response);
	}
}
