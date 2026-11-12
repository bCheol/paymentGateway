package com.example.payment.controller;

import com.example.payment.config.TokenProvider;
import com.example.payment.dto.OAuthInfo;
import com.example.payment.dto.ResponseData;
import com.example.payment.dto.UserState;
import com.example.payment.service.AccountService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final TokenProvider tokenProvider;

    @GetMapping("/account/profile")
    public ResponseData getProfileInfo(@RequestParam String accountId) {

        String provider = getProvider(accountId);
        OAuthInfo oAuthInfo = accountService.getOAuthInfo(provider, accountId);
        if (oAuthInfo != null) {
            Map<String, Object> result = new HashMap<>();
            result.put("modify", false);
            result.put("role", oAuthInfo.getRole());
            result.put("name", oAuthInfo.getName());
            result.put("contact", oAuthInfo.getEmail());

            return new ResponseData(true, result);
        }

        return new ResponseData(false, null);
    }

    @PostMapping("/logout")
    public ResponseData logout(HttpServletResponse response, @CookieValue(name = "reToken", required = false) String reToken) {

        if (reToken == null)
            return new ResponseData(false, null);

        String accountId = tokenProvider.getUserId(reToken);
        String provider = getProvider(accountId);

        accountService.deleteRefreshToken(provider, accountId);
        ResponseCookie responseCookie = ResponseCookie.from("reToken", "")
                .path("/api")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());

        return new ResponseData(true, null);
    }

    @PostMapping("/account/withdraw-oauth")
    public ResponseData withdrawOAuth(@AuthenticationPrincipal String authId) {

        String provider = getProvider(authId);

        if (accountService.withdrawOAuth(provider, authId))
            return new ResponseData(true, "탈퇴되었습니다");

        return new ResponseData(false, "탈퇴에 실패했습니다");
    }

    @PostMapping("/validation")
    public ResponseData validationToken(HttpServletResponse response, @CookieValue(name = "reToken", required = false) String reToken) {

        if (reToken == null)
            return new ResponseData(false, null);

        int checkToken = tokenProvider.validToken(reToken);
        String accountId = tokenProvider.getUserId(reToken);
        String role = (String) tokenProvider.getClaims(reToken).get("role");
        String provider = getProvider(accountId);

        if (checkToken == 1) {
            String newAccessToken = tokenProvider.createAccessToken(accountId, role);

            OAuthInfo oAuthInfo = accountService.getOAuthInfo(provider, accountId);
            if (oAuthInfo != null) {
                UserState userState = new UserState(newAccessToken, accountId, oAuthInfo.getRole(), oAuthInfo.getName());
                return new ResponseData(true, userState);
            }
        } else if (checkToken == 0) {
            String getRefreshToken = accountService.getRefreshToken(provider, accountId);

            if (!getRefreshToken.equals(reToken))
                return new ResponseData(false, null);

            String newRefreshToken = tokenProvider.createRefreshToken(accountId, role);

            accountService.updateRefreshToken(provider, accountId, newRefreshToken);
            String newAccessToken = tokenProvider.createAccessToken(accountId, role);

            OAuthInfo oAuthInfo = accountService.getOAuthInfo(provider, accountId);
            if (oAuthInfo != null) {
                ResponseCookie responseCookie = ResponseCookie.from("reToken", newRefreshToken)
                        .path("/api")
                        .httpOnly(true)
                        .secure(false)
                        .sameSite("Lax")
                        .maxAge(Duration.ofDays(7))
                        .build();
                response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());

                UserState userState = new UserState(newAccessToken, accountId, oAuthInfo.getRole(), oAuthInfo.getName());
                return new ResponseData(true, userState);
            }
        }

        accountService.deleteRefreshToken(provider, accountId);
        ResponseCookie responseCookie = ResponseCookie.from("reToken", "")
                .path("/api")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());

        return new ResponseData(false, null);
    }

    public String getProvider(String accountId) {
        String[] providerList = { "gmail" };
        for (String data: providerList) {
            if (accountId.contains(data)) {
                return data;
            }
        }
        return null;
    }

}