"use client";
import Cookies from "js-cookie";

export const saveCookie = (token: string) => {
  Cookies.set("token", token, { expires: 1 });
};
