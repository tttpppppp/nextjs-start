"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Http } from "@/lib/http";
import { decodeJwt, getCookieUser, saveCookie } from "@/utils/utils";
import axios from "axios";
import { ResponseData } from "@/types/ResponseType";
import { useAuthStore } from "@/store/Auth";

const GoogleCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setAuthenticate } = useAuthStore();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    const exchangeToken = async () => {
      try {
        const res = await Http.post<ResponseData<string>>(
          "/auth/google/callback",
          { code }
        );
        if (res.data.data) {
          saveCookie(res.data.data as string);
          setAuthenticate(Boolean(getCookieUser()));
          const decodedUser = decodeJwt(res.data.data as string);
          console.log(decodedUser);

          if (decodedUser) {
            setUser(decodedUser);
          }
        }
        router.push("/");
      } catch (error) {
        console.error("Lỗi login Google:", error);
      }
    };

    exchangeToken();
  }, [searchParams, router]);

  return <div>Đang đăng nhập Google...</div>;
};

export default GoogleCallbackPage;
