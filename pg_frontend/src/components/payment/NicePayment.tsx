"use client";

import Button from "@/components/ui/button/Button";
import Script from 'next/script';
import { useState, useEffect } from "react";
import api from "@/lib/api"
import { v4 as uuidv4 } from 'uuid';

export default function NicePayment() {

    const [orderKey, setOrderKey] = useState('');
    const [orderId, setOrderId] = useState('');
    const [goodsName, setGoodsName] = useState('');
    const [amount, setAmount] = useState(0);

    const orderTemp = async () => {

        const response = await api.post('/api/order-temp', {
            "orderKey": orderKey,
            "orderId": orderId,
            "amount": amount  
        });

        const res = response.data;
        if (res.result) {
            serverAuth();
        } else {
            alert(res.message);
        }
    }

    const serverAuth = () => {
        const pay_obj : any = window ;
        const { AUTHNICE } = pay_obj
        AUTHNICE.requestPay({
            clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_KEY,
            method: 'card',
            orderId: orderId,
            amount: amount,
            goodsName: goodsName,
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
    
    useEffect(() => {
        setOrderKey(uuidv4());
        setOrderId(random());
        setGoodsName('나이스페이-상품');
        setAmount(1004);
    }, [])

    return (
        <>
            <Script src='https://pay.nicepay.co.kr/v1/js/' />
            
            <Button className="w-full" size="sm" onClick={() => orderTemp()}>
                결제하기
            </Button>
        </>
    );
}