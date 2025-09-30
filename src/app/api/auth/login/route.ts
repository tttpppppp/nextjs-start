import { LoginBodyType } from "@/schemaValidations/auth.schema";

export async function POST(request: Request) {
  const res = (await request.json()) as LoginBodyType;
}
