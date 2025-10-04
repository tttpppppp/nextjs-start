/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { LoginBodyType, LoginBody } from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { decodeJwt, getCookieUser, saveCookie } from "@/utils/utils";
import { configClient } from "@/config";
import { useSnackBarStore } from "@/store/Snackbar";
import { useAuthStore } from "@/store/Auth";
import { useLoginMutation } from "@/queries/auth.query";

const getOauthGoogleUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: configClient.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    client_id: configClient.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};

export default function LoginPage() {
  const router = useRouter();
  const { showSnack } = useSnackBarStore();
  const { setUser, setAuthenticate, logout } = useAuthStore();
  const { mutate: loginMutate, isPending, error } = useLoginMutation();

  useEffect(() => {
    logout();
  }, [logout]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
  });

  const onSubmit = (data: LoginBodyType) => {
    loginMutate(data, {
      onSuccess: (res) => {
        saveCookie(res.data.data as string);
        setAuthenticate(Boolean(getCookieUser()));
        const decodedUser = decodeJwt(res.data.data as string);
        if (decodedUser) setUser(decodedUser);
        router.push("/");
        showSnack("Đăng nhập thành công", "success");
      },
      onError: (err: any) => {
        showSnack(err.message || "Đăng nhập thất bại", "error");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardContent className="p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600">T</span>
            </div>
            <Typography variant="h5" className="font-bold text-gray-800">
              Welcome Back
            </Typography>
            <Typography variant="body2" className="text-gray-500 mt-1">
              Please sign in to continue
            </Typography>
          </div>

          {error && (
            <p className="text-red-500 mb-3">{(error as Error).message}</p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <TextField
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              fullWidth
              size="large"
              className="rounded-xl py-3 font-semibold shadow-md hover:shadow-lg transition bg-indigo-600 hover:bg-indigo-700"
            >
              {isPending ? "Loading..." : "Login"}
            </Button>
          </form>

          <Divider className="my-6">OR</Divider>

          <div className="flex flex-col gap-3">
            <Link href={getOauthGoogleUrl()}>
              <Button
                variant="outlined"
                fullWidth
                className="rounded-xl py-2 font-medium bg-white hover:bg-gray-50"
              >
                Continue with Google
              </Button>
            </Link>
            <Button
              variant="outlined"
              fullWidth
              className="rounded-xl py-2 font-medium bg-white hover:bg-gray-50"
            >
              Continue with GitHub
            </Button>
          </div>

          <div className="text-center mt-8 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
