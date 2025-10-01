import { db } from "@/config/firebase";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { createSigner } from "fast-jwt";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { DataResponse } from "../../response/DataReponse";
import { HttpStatus } from "@/enum/htppStatus";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const res = (await request.json()) as LoginBodyType;
  const findUser = query(
    collection(db, "users"),
    where("email", "==", res.email)
  );
  const snapshot = await getDocs(findUser);

  if (snapshot.empty) {
    return NextResponse.json(
      new DataResponse(HttpStatus.UNAUTHORIZED, "Tài khoản không tồn tại")
    );
  }
  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  const isMatch = await bcrypt.compare(res.password, userData.password);
  if (isMatch) {
    const signer = createSigner({ key: process.env.SECRET_KEY, expiresIn: 60 });
    const token = signer({ email: res.email });
    return NextResponse.json(
      new DataResponse(HttpStatus.OK, "Đăng nhập thành công", token)
    );
  }
  return NextResponse.json(
    new DataResponse(HttpStatus.UNAUTHORIZED, "Sai email hoặc mật khẩu")
  );
}
