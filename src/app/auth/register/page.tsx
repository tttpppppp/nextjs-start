/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import Link from "next/link";
import {
  RegisterBody,
  RegisterFormType,
} from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerAccount } from "@/queries/auth.query";
import { create } from "zustand";
import { useSnackBarStore } from "@/store/Snackbar";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterBody),
  });

  const onSubmit = async (data: RegisterFormType) => {
    console.log(data);

    const { confirmPassword, ...body } = data;
    const res = await registerAccount(body);
    if (res.data.status == 201) {
      return res;
    }
    throw new Error(res.data.message);
  };

  const { showSnack } = useSnackBarStore();

  const { isPending, mutate } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      router.push("/auth/login");
      showSnack("Đăng kí thành công", "success");
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
              Register Account
            </Typography>
            <Typography variant="body2" className="text-gray-500 mt-1">
              Please sign in to continue
            </Typography>
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={handleSubmit((data) => {
              mutate(data);
            })}
          >
            <div className="mb-3">
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>

            <div className="mb-3">
              <TextField
                label="Phone number"
                type="text"
                fullWidth
                variant="outlined"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
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

            <div className="mb-3">
              <TextField
                label="Confirm password"
                type="password"
                fullWidth
                variant="outlined"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              variant="contained"
              fullWidth
              size="large"
              className="rounded-xl py-3 font-semibold shadow-md hover:shadow-lg transition bg-indigo-600 hover:bg-indigo-700"
            >
              {isPending ? "Loading..." : "Register"}
            </Button>
          </form>

          <Divider className="my-6">OR</Divider>

          <div className="flex flex-col gap-3">
            <Button
              variant="outlined"
              fullWidth
              className="rounded-xl py-2 font-medium bg-white hover:bg-gray-50"
            >
              Continue with Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              className="rounded-xl py-2 font-medium bg-white hover:bg-gray-50"
            >
              Continue with GitHub
            </Button>
          </div>

          <div className="text-center mt-8 text-sm text-gray-600">
            Already account?{" "}
            <Link
              href="/auth/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
