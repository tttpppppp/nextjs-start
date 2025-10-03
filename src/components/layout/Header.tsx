// components/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
} from "@mui/material";
import SelectLanguage from "../SelectLanguage";
import { menu } from "@/constants/constants";
import { useAuthStore } from "@/store/Auth";
import { removeCookie } from "@/utils/utils";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const { authenticate, user, setUser, setAuthenticate } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setAnchorEl(null);
  }, [pathname]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    removeCookie();
    setUser(null);
    setAuthenticate(false);
    router.push("/auth/login");
  };

  console.log(anchorEl + "lon");

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Menu */}
        <div className="flex items-center space-x-12">
          <Link href="/">
            <div className="text-3xl font-bold text-blue-600 cursor-pointer">
              TPP
            </div>
          </Link>

          <nav className="hidden md:flex gap-5 text-lg">
            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: User / Login + Language */}

        <div className="flex items-center gap-6 text-lg">
          <SelectLanguage />
          {authenticate ? (
            <>
              <Tooltip title={user?.email || ""} arrow>
                <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user?.picture ? (
                      <Image
                        src={user.picture}
                        alt="avatar"
                        width={32}
                        height={32}
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      user?.email?.[0]?.toUpperCase()
                    )}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Link href={"/auth/login"}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className="capitalize text-lg px-6 py-2"
              >
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
