import { usersService } from "@/services/users.service";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const createUser = usersService.createUser(body);
  if (!createUser) {
    return NextResponse.json(
      { message: "Tạo tài khoản thất bại" },
      { status: 400 }
    );
  }
  return NextResponse.json({ message: "Tạo tài khoản thành công", body });
}
