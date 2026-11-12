import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import SignInHeader from "./header";
import SocialButton from "./social-button";
import { socialProviders } from "./data";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';

export default function SignIn() {

     const navigate = useNavigate();

    const oauthSignIn = () => {
        window.open(`${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`, 'googleLogin', 'width=500,height=600');
    }

    useEffect(() => {
        const channel = new BroadcastChannel("oauth");

        channel.onmessage = (e) => {
            if (e.data?.type === "OAUTH_SUCCESS") {
                localStorage.setItem('accessToken', e.data.accessToken);
                navigate("/");
            } else if (e.data?.type === "OAUTH_FAIL") {
                alert("로그인에 실패했습니다");
            }
        };
        return () => channel.close();
    }, [navigate]);

    return (
        <div className="flex h-screen pb-50">
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
                <div>
                    <SignInHeader />

                    <SocialButton
                        className="w-full"
                        key={socialProviders[0].id}
                        provider={socialProviders[0]}
                        onClick={() => oauthSignIn()}
                    />
                </div>
            </div>
        </div>
    );
}