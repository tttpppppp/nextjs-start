import { db } from "@/config/firebase";
import { HttpStatus } from "@/enum/htppStatus";
import { RegisterBodyType } from "@/schemaValidations/auth.schema";
import { usersService } from "@/services/users.service";
import { collection, getDocs, query, where } from "firebase/firestore";

import { NextResponse } from "next/server";
import { DataResponse } from "../../response/DataReponse";
import bcrypt from "bcrypt";
import { UserRole } from "@/enum/UserStatus";
export async function POST(req: Request) {
  const res = (await req.json()) as RegisterBodyType;
  const findUser = query(
    collection(db, "users"),
    where("email", "==", res.email)
  );
  const snapshot = await getDocs(findUser);
  if (!snapshot.empty) {
    return NextResponse.json(
      new DataResponse(HttpStatus.UNAUTHORIZED, "Email đã tồn tại")
    );
  }

  const hashPassword = await bcrypt.hash(res.password, 10);
  const createUser = await usersService.createUser({
    ...res,
    password: hashPassword,
    role: UserRole.USER,
  });
  if (!createUser) {
    return NextResponse.json(
      new DataResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Tạo tài khoản thất bại"
      )
    );
  }
  return NextResponse.json(
    new DataResponse(HttpStatus.CREATED, "Tạo tài khoản thành công")
  );
}
