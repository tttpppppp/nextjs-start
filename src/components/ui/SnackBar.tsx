"use client"; // bắt buộc cho Client Component
import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSnackBarStore } from "@/store/Snackbar";

export default function MySnackBar() {
  const { open, message, severity, closeSnack } = useSnackBarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeSnack}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={closeSnack} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
