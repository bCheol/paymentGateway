package com.example.payment.mapper;

import com.example.payment.dto.OAuthInfo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountMapper {


    /** OAuth */
    OAuthInfo selectOAuth(String provider, String email);
    int insertOAuth(String provider, String providerId, String email, String name);
    int updateOAuth(String provider, String providerId, String name);
    int withdrawOAuth(String provider, String email);

    /** token */
    String selectRefreshToken(String provider, String id);
    int insertRefreshToken(String provider, String id, String refreshToken);
    int updateRefreshToken(String provider, String id, String refreshToken);
    int deleteRefreshToken(String provider, String id);

}