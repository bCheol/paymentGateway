package com.example.payment.service;

import com.example.payment.dto.NicePaymentResult;
import com.example.payment.mapper.PaymentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    @Value("${NICE_CLIENT_KEY}")
    String ClientKey;
    @Value("${NICE_SECRET_KEY}")
    String SecretKey;
    String nicePaymentUrl = "https://sandbox-api.nicepay.co.kr/v1/payments/";

    private final PaymentMapper paymentMapper;

    public boolean existsOrderKey(String orderKey) {
        return paymentMapper.existsOrderKey(orderKey) == 1;
    }

    @Transactional(rollbackFor = Exception.class)
    public void saveTempOrder(String orderKey, String orderId, Integer amount) {
        paymentMapper.insertTempOrder(orderKey, orderId, amount);
    }

    public boolean validateOrder(String orderId, String amount) {
        return paymentMapper.validateOrder(orderId, amount) == 1;
    }

    public NicePaymentResult approveOrder(String tid, String amount) {

        String token = ClientKey + ":" + SecretKey;
        String encodeToken = Base64.getEncoder().encodeToString(token.getBytes(StandardCharsets.UTF_8));

        return RestClient.create().post()
                .uri(nicePaymentUrl + tid)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Basic " + encodeToken)
                .body(Map.of("amount", amount))
                .retrieve()
                .body(NicePaymentResult.class);
    }

    @Transactional(rollbackFor = Exception.class)
    public void saveOrder(String orderId, Integer amount) {
        paymentMapper.insertOrderInfo(orderId, amount);
    }

    public Map<String, String> getOrderInfo(String orderId, String accountId) {
        return paymentMapper.selectOrderInfo(orderId, accountId);
    }

}