// components/Header.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button, MenuItem, Select } from "@mui/material";
import SelectLanguage from "../SelectLanguage";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Menu */}
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <Link href="/">
            <div className="text-3xl font-bold text-blue-600 cursor-pointer">
              TPP
            </div>
          </Link>

          {/* Menu Items */}
          <nav className="hidden md:flex space-x-8 text-lg">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Login + Language */}
        <div className="flex items-center gap-4 text-lg">
          <Link href={"/auth/login"}>
            {" "}
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className="capitalize text-lg px-6 py-2"
            >
              Đăng nhập
            </Button>
          </Link>
          <SelectLanguage />
        </div>
      </div>
    </header>
  );
}
