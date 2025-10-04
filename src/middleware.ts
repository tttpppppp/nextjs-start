import { NextRequest, NextResponse } from "next/server";
import { verifyJwtEdge } from "./utils/jwt";

const privateRoute = ["/manager"];
const publicRoute = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const payload = token ? await verifyJwtEdge(token) : null;
  const isAuthenticated = Boolean(payload);
  if (privateRoute.includes(pathname) && !isAuthenticated && token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (publicRoute.some((route) => route === pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isAuthenticated && !publicRoute.includes(pathname)) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/manager/:path*", "/"],
};
