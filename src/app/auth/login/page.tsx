"use client";

import React from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginAccount } from "@/queries/auth.query";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { saveCookie } from "@/utils/utils";
import { configClient } from "@/config";

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

const googleOAuthUrl = getOauthGoogleUrl();

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
  });
  const onSubmit = async (data: LoginBodyType) => {
    const res = await loginAccount(data);
    if (res.data.status == 200) {
      return res;
    }
    throw new Error(res.data.message);
  };

  const { isPending, mutate, error } = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      saveCookie(data.data.data as string);
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
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

          {/* Form */}
          <div>
            {error && (
              <p className="text-red-500 mb-3">{(error as Error).message}</p>
            )}

            <form
              className="space-y-5"
              onSubmit={handleSubmit((data) => mutate(data))}
            >
              <div className="mb-3">
                <TextField
                  label="Email"
                  type="text"
                  fullWidth
                  variant="outlined"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </div>
              <div className="mb-3">
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
          </div>

          {/* Or */}
          <Divider className="my-6">OR</Divider>

          {/* Social login */}
          <div className="flex flex-col gap-3">
            <Link href={googleOAuthUrl}>
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

          {/* Footer */}
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
