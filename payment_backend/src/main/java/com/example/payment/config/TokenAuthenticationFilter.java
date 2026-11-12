package com.example.payment.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String[] targetUrl = {"/api/account", "/api/payment"};
        String url = request.getRequestURL().toString();

        if (Arrays.stream(targetUrl).anyMatch(url::contains)) {
            String authorizationHeader = request.getHeader("Authorization");
            if (authorizationHeader == null) {
                response.setStatus(401);
                return;
            }

            String accessToken = getAccessToken(authorizationHeader);
            switch (tokenProvider.validToken(accessToken)) {
                case 1:
                    Authentication authentication = tokenProvider.getAuthentication(accessToken);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    break;
                case 0:
                    response.setStatus(401);
                    return;
                case -1:
                    response.sendError(401);
                    return;
            }
        }
        filterChain.doFilter(request, response);
    }

    private String getAccessToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring("Bearer ".length());
        }
        return null;
    }

}