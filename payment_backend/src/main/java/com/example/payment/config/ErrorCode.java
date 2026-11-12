package com.example.payment.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    USER_NOT_SIGNUP("1000", "가입 불가능한 계정입니다"),
    USER_LOGIN_FAIL("1001", "로그인에 실패했습니다"),
    USER_BLOCK("1002", "차단된 계정입니다"),
    USER_PERMISSION_NOT_EXIST("1003", "접근 권한이 없습니다"),

    TOKEN_VALIDATE_FAIL("1100", "토큰 검증에 실패했습니다"),

    ORDER_VALIDATE_FAIL("1200", "주문 내역 검증에 실패했습니다"),
    ORDER_SAVE_FAIL("1201", "다시 시도해 주세요"),

    PAY_CERTIFICATION_FAIL("1300", "결제 인증에 실패했습니다"),
    PAY_APPROVE_FAIL("1301", "결제 승인에 실패했습니다"),

    UNKNOWN_ERROR("9999", "알 수 없는 오류가 발생했습니다");

    private final String code;
    private final String message;

}