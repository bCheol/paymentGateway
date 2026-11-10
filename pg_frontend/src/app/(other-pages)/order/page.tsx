import type { Metadata } from "next";
import { Suspense } from 'react';
import OrderInfo  from "@/components/payment/OrderInfo"

export const metadata: Metadata = {
  title: "Payment",
  description: "Payment",
};

export default function OrderInfoPage() {

  return (
    <div>
      <Suspense>
        <OrderInfo />
      </Suspense>
    </div>
  );
}