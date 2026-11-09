package com.example.payment.service;

import com.example.payment.dto.NicePaymentResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${NICE_CLIENT_KEY}")
    String ClientKey;
    @Value("${NICE_SECRET_KEY}")
    String SecretKey;
    String nicePaymentUrl = "https://sandbox-api.nicepay.co.kr/v1/payments/";

    public void successPay(String tid, String amount) {

        String token = ClientKey + ":" + SecretKey;
        String encodeToken = Base64.getEncoder().encodeToString(token.getBytes(StandardCharsets.UTF_8));

        NicePaymentResult nicePaymentResult = RestClient.create().post()
                .uri(nicePaymentUrl + tid)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Basic " + encodeToken)
                .body(Map.of("amount", amount))
                .retrieve()
                .body(NicePaymentResult.class);
    }

}