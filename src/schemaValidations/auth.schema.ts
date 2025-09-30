import z from "zod";

export const LoginBody = z
  .object({
    email: z.string(),
    password: z.string().min(6).max(100),
  })
  .strict();

export type LoginBodyType = z.infer<typeof LoginBody>;
