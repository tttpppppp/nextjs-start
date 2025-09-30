import { NextRequest, NextResponse } from "next/server";

const isAUthenCation = false;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isAUthenCation) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  console.log(pathname);
}

export const config = {
  matcher: ["/explore"],
};
