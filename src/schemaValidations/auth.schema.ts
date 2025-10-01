/* eslint-disable @typescript-eslint/no-unused-vars */
import z from "zod";

export const LoginBody = z
  .object({
    email: z
      .string()
      .nonempty("Email không được bỏ trống")
      .email("Email không hợp lệ"),
    password: z
      .string()
      .nonempty("Password không được bỏ trống")
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .max(100),
  })
  .strict();
export type LoginBodyType = z.infer<typeof LoginBody>;

export const RegisterBody = z
  .object({
    email: z
      .string()
      .nonempty("Email không được bỏ trống")
      .email("Email không hợp lệ"),
    phone: z
      .string()
      .nonempty("Số điện thoại không được bỏ trống")
      .regex(/^0\d{9,10}$/, "Số điện thoại không hợp lệ"),
    password: z
      .string()
      .nonempty("Mật khẩu không được bỏ trống")
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .max(100),
    confirmPassword: z
      .string()
      .nonempty("Xác nhận mật khẩu không được bỏ trống"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  })
  .strict();

export type RegisterFormType = z.infer<typeof RegisterBody>;
export const RegisterBodySchema = RegisterBody.omit({ confirmPassword: true });
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
