import NicePaymentPage from "@/pages/main/nicepayment"
import { useEffect } from "react";
import { useUserStateStore } from '@/lib/useUserStateStore';
import api from '@/lib/api';

export default function HomePage() {

  const initAuth = () => {

    api.post('/api/validation')
      .then((response) => {
        const res = response.data;
        if (res.result) {
          localStorage.setItem('accessToken', res.data.accessToken);
          useUserStateStore.getState().saveState(res.data.accountId, res.data.role, res.data.nickName);
        } else {
          useUserStateStore.getState().deleteInfo();
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  useEffect(() => {
    if (localStorage.getItem('accessToken') != null)
      initAuth();
  }, [])

  return (
    <div>
      <NicePaymentPage />
    </div>
  );
}