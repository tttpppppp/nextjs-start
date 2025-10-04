// app/api/auth/google/callback/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { DataResponse } from "@/app/api/response/DataReponse";
import { HttpStatus } from "@/enum/htppStatus";
import { signJwt } from "@/utils/jwt";

export async function POST(req: Request) {
  const { code } = await req.json();
  const tokenRes = await axios.post(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  const { access_token } = tokenRes.data;
  const userRes = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );

  const googleUser = userRes.data;

  const accessToken = signJwt({
    email: googleUser.email,
    name: googleUser.name,
    picture: googleUser.picture,
  });

  return NextResponse.json(
    new DataResponse(HttpStatus.OK, "Lấy dữ liệu thành công", accessToken)
  );
}
