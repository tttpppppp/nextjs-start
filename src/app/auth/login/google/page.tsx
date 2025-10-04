"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Http } from "@/lib/http";
import { decodeJwt, getCookieUser, saveCookie } from "@/utils/utils";
import axios from "axios";
import { ResponseData } from "@/types/ResponseType";
import { useAuthStore } from "@/store/Auth";
import { useSnackBarStore } from "@/store/Snackbar";

const GoogleCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setAuthenticate } = useAuthStore();
  const { showSnack } = useSnackBarStore();
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

          if (decodedUser) {
            setUser(decodedUser);
          }
        }
        router.push("/");
        showSnack("Đăng nhập thành công", "success");
      } catch (error) {
        console.error("Lỗi login Google:", error);
      }
    };

    exchangeToken();
  }, [searchParams, router]);

  return (
    <div className="text-3xl text-center mt-10">Đang đăng nhập Google...</div>
  );
};

export default GoogleCallbackPage;
