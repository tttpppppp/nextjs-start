// components/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import SelectLanguage from "../SelectLanguage";
import { menu } from "@/constants/constants";
import { useAuthStore } from "@/store/Auth";
import { removeCookie } from "@/utils/utils";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
  const { authenticate, user, setUser, setAuthenticate } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setAnchorEl(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    removeCookie("token");
    setUser(null);
    setAuthenticate(false);
    router.push("/auth/login");
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <div className="text-3xl font-extrabold cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text transition-transform hover:scale-105">
              TPP
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 text-lg font-medium text-gray-700">
            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="relative group hover:text-blue-600 transition-colors"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: User / Login + Language */}
        <div className="flex items-center gap-6">
          <SelectLanguage />

          {authenticate ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block max-w-[180px] truncate text-gray-800 font-medium">
                {user?.email}
              </span>
              <Tooltip title={user?.email || ""} arrow>
                <IconButton
                  onClick={handleMenuClick}
                  sx={{
                    p: 0,
                    transition: "all 0.3s",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    {user?.picture ? (
                      <Image
                        src={user.picture}
                        alt="avatar"
                        width={38}
                        height={38}
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
                TransitionComponent={Fade}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link href={"/auth/login"}>
              <Button
                variant="contained"
                size="medium"
                className="capitalize px-6 py-2 text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-transform hover:-translate-y-0.5 hover:scale-105"
              >
                Đăng nhập
              </Button>
            </Link>
          )}

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              size="large"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg px-6 py-4 space-y-3 transform transition-transform duration-300 ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {menu.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="block text-gray-700 font-medium hover:text-blue-600 transition-colors"
          >
            {item.name}
          </Link>
        ))}
        {!authenticate && (
          <Link href={"/auth/login"}>
            <Button
              variant="contained"
              size="medium"
              className="w-full capitalize text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-transform hover:-translate-y-0.5 hover:scale-105"
            >
              Đăng nhập
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
