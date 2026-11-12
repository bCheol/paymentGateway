import AppLayout from "@/components/layout/app-layout";
import HomePage from "@/pages/main/home";
import { Error404Page } from "@/pages/main/pages";
import { SignInPage } from "@/pages/others/auth";
import OAuthCallback from "@/pages/others/auth/callback";
import OrderInfo from "@/pages/main/order";
import "flatpickr/dist/flatpickr.css";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <Routes>
      {/* Dashboard Layout */}
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        {/* <Route path="/signup" element={<SignUpPage />} /> */}

        <Route path="/order" element={<OrderInfo />} />    
      </Route>

      {/* Full-width / Error / Status Pages */}
      <Route path="/error-404" element={<Error404Page />} />

      {/* Fallback Route */}
      <Route path="*" element={<Error404Page />} />
      
      <Route path="/oauth/callback" element={<OAuthCallback />} />
    </Routes>
  );
}