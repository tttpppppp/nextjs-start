import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url("NEXT_PUBLIC_API_URL phải là URL hợp lệ"),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!configProject.success) {
  console.log(configProject.error);
  throw new Error("Biến môi trường không hợp lệ");
}

export const configClient = configProject.data;
