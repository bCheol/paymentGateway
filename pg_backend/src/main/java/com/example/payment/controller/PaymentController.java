package com.example.payment.controller;

import com.example.payment.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;


    @PostMapping("/serverAuth")
    public void testMethod(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, String> body) throws IOException {

        String authResultCode = body.get("authResultCode");

        if ("0000".equals(authResultCode)) {

            String tid = body.get("tid");
            String clientId = body.get("clientId");
            String orderId =body.get("orderId");
            String amount =body.get("amount");
            String authToken =body.get("authToken");
            String signature =body.get("signature");

            paymentService.successPay(tid, amount);

            response.sendRedirect("http://localhost:3000/payment");
        } else {

        }
    }

}