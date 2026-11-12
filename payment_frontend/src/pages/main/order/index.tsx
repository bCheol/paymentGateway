import { useState, useEffect } from "react";
import api from "@/lib/api"
import { useSearchParams } from 'react-router';

export default function OrderInfo() {

    const [searchParams, setSearchParams] = useSearchParams();

    const getOrderInfo = () => {

        const orderId = searchParams.get("orderId")

        api.get('/api/payment/order-info?orderId=' + orderId)
        .then((response) => {
            const res = response.data;
            console.log(res);
        })
        .catch((error) => {
            //console.log(error);
        })
    }

    useEffect(() => {
        getOrderInfo();
    }, [])

    return (
        <>
        </>
    );
}