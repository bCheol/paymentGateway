"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api"
import { useSearchParams } from "next/navigation";

export default function OrderInfo() {

    const searchParams = useSearchParams();

    const getOrderInfo = () => {

        const orderId = searchParams.get("orderId")

        api.get('/api/order-info?orderId=' + orderId)
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