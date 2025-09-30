"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ButtonRedirect = ({ text, url }: { text: string; url: string }) => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push(url);
  };
  return (
    <div>
      <Button onClick={handleNavigate}>{text}</Button>
    </div>
  );
};

export default ButtonRedirect;
