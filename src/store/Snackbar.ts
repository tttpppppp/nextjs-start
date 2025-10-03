// src/store/snackbar.ts
import { create } from "zustand";

interface SnackBarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  showSnack: (
    msg: string,
    sev?: "success" | "error" | "info" | "warning"
  ) => void;
  closeSnack: () => void;
}

export const useSnackBarStore = create<SnackBarState>((set) => ({
  open: false,
  message: "",
  severity: "success",
  showSnack: (msg, sev = "success") =>
    set({ open: true, message: msg, severity: sev }),
  closeSnack: () => set({ open: false }),
}));
