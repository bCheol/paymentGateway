package com.example.payment.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface PaymentMapper {

    /** NicePayment */
    int existsOrderKey(String orderKey);
    int insertTempOrder(String orderKey, String orderId, Integer amount);
    int validateOrder(String orderId, String amount);
    int insertOrderInfo(String orderId, Integer amount);
    Map<String, String> selectOrderInfo(String orderId, String accountId);

}