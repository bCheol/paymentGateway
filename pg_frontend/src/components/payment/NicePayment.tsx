"use client";

import Button from "@/components/ui/button/Button";
import Script from 'next/script';
import { useEffect } from "react";

export default function NicePayment() {

    useEffect(() => {

    }, [])

    const serverAuth = () => {
        const pay_obj : any = window ;
        const { AUTHNICE } = pay_obj
        AUTHNICE.requestPay({
            clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_KEY,
            method: 'card',
            orderId: random(),
            amount: 1004,
            goodsName: '나이스페이-상품',
            returnUrl: `${process.env.NEXT_PUBLIC_API_URL}/serverAuth`,
            fnError: function (result:any) {
                console.log(result);
                alert('고객용메시지 : ' + result.msg + '\n개발자확인용 : ' + result.errorMsg + '')
            }
        });
    }

    const random = (length = 8) => {
        return Math.random().toString(16).substr(2, length);
    };	

    return (
        <>
            <Script src='https://pay.nicepay.co.kr/v1/js/' />
            
            <Button className="w-full" size="sm" onClick={() => serverAuth()}>
                결제하기
            </Button>
        </>
    );
}