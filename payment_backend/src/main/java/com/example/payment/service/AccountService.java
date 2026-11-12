package com.example.payment.service;

import com.example.payment.dto.OAuthInfo;
import com.example.payment.mapper.AccountMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountMapper accountMapper;

    public OAuthInfo getOAuthInfo(String provider, String email) {
        return accountMapper.selectOAuth(provider, email);
    }

    @Transactional(rollbackFor = Exception.class)
    public boolean withdrawOAuth(String provider, String email) {
        return accountMapper.withdrawOAuth(provider, email) == 1;
    }

    public String getRefreshToken(String provider, String id) {
        return accountMapper.selectRefreshToken(provider, id);
    }

    public int updateRefreshToken(String provider, String id, String token) {
        return accountMapper.updateRefreshToken(provider, id, token);
    }

    public int deleteRefreshToken(String provider, String id) {
        return accountMapper.deleteRefreshToken(provider, id);
    }

}