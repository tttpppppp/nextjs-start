import { NextRequest, NextResponse } from "next/server";

const privateRoute = ["/manager"];
const publicRoute = ["/auth/login"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = Boolean(token);

  const { pathname } = request.nextUrl;

  if (privateRoute.some((route) => route === pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (publicRoute.some((route) => route === pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/manager/:path*"],
};
