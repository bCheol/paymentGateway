package com.example.payment.controller;

import com.example.payment.config.ErrorCode;
import com.example.payment.dto.NicePaymentResult;
import com.example.payment.dto.ResponseData;
import com.example.payment.service.PaymentService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class PaymentController {

    @Value("${BASE_URL}")
    String baseUrl;

    private final PaymentService paymentService;

    @PostMapping("/api/payment/order-temp")
    public ResponseData orderTemp(@RequestBody Map<String, Object> body) {

        String orderKey = (String) body.get("orderKey");

        if (paymentService.existsOrderKey(orderKey))
            return new ResponseData(false, ErrorCode.ORDER_VALIDATE_FAIL.getMessage());

        String orderId = (String) body.get("orderId");
        Integer amount = (Integer) body.get("amount");

        try {
            paymentService.saveTempOrder(orderKey, orderId, amount);
            return new ResponseData(true, null);
        } catch (Exception e) {
            return new ResponseData(false, ErrorCode.ORDER_SAVE_FAIL.getMessage());
        }
    }

    @PostMapping("/api/serverAuth")
    public void nicePaymentReturn(HttpServletResponse response, @RequestParam Map<String, String> body) {

        String authResultCode = body.get("authResultCode");

        if ("0000".equals(authResultCode)) {
            String orderId = body.get("orderId");
            String amount = body.get("amount");

            if (paymentService.validateOrder(orderId, amount)) {
                String tid = body.get("tid");
                NicePaymentResult nicePaymentResult = paymentService.approveOrder(tid, amount);

                if (nicePaymentResult == null)
                    return;

                if ("0000".equals(nicePaymentResult.getResultCode())) {
                    try {
                        paymentService.saveOrder(nicePaymentResult.getOrderId(), nicePaymentResult.getAmount());
                        response.sendRedirect(baseUrl + "/order?orderId="+orderId);
                        return;
                    } catch (Exception e) {
                        return;
                    }
                } else {
                    return;
                }
            } else{
                return;
            }
        }
    }

    @GetMapping("/api/payment/order-info")
    public ResponseData orderInfo( @AuthenticationPrincipal String authId, @RequestParam String orderId) {

        return new ResponseData(true, paymentService.getOrderInfo(orderId, authId));
    }

}