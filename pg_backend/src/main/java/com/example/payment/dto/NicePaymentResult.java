package com.example.payment.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class NicePaymentResult {

    String resultCode;
    String resultMsg;
    String tid;
    String cancelledTid;
    String orderId;
    String ediDate;
    String signature;
    String status;
    String paidAt;
    String failedAt;
    String cancelledAt;
    String payMethod;
    Integer amount;
    Integer balanceAmt;
    String goodsName;
    String mallReserved;
    Boolean useEscrow;
    String currency;
    String channel;
    String approveNo;
    String buyerName;
    String buyerTel;
    String buyerEmail;
    Boolean IssuedCashReceipt;
    String receiptUrl;
    String mallUserId;

}