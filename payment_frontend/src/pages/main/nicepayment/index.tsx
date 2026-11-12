import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import api from "@/lib/api"

export default function NicePayment() {

    const [orderKey, setOrderKey] = useState('');
    const [orderId, setOrderId] = useState('');
    const [goodsName, setGoodsName] = useState('');
    const [amount, setAmount] = useState(0);

    const orderTemp = async () => {

        const response = await api.post('/api/payment/order-temp', {
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
            clientId: import.meta.env.VITE_NICEPAY_CLIENT_KEY,
            method: 'card',
            orderId: orderId,
            amount: amount,
            goodsName: goodsName,
            returnUrl: `${import.meta.env.VITE_API_BASE_URL}/api/serverAuth`,
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
        setOrderKey(crypto.randomUUID());
        setOrderId(random());
        setGoodsName('나이스페이-상품');
        setAmount(1004);
    }, [])

    return (
        <>
            <script async src='https://pay.nicepay.co.kr/v1/js/'></script>
            
            <Button size="sm" onClick={() => orderTemp()}>
                결제하기
            </Button>
        </>
    );
}