"use client";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
// Lưu cookie
export const saveCookie = (token: string) => {
  Cookies.set("token", token, { expires: 1 });
};

// Lấy cookie
export const getCookieUser = (): string | undefined => {
  return Cookies.get("token");
};

// Xóa cookie (nếu cần)
export const removeCookie = () => {
  Cookies.remove("token");
};

export const decodeJwt = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    throw new Error("Lỗi decode");
  }
};
