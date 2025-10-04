/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type UserInformation = {
  email: string;
  name: string;
  picture: string;
};
interface AuthStore {
  authenticate: boolean;
  user: UserInformation | null;
  setAuthenticate: (value: boolean) => void;
  setUser: (value: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authenticate: false,
  user: null,
  setAuthenticate: (value) => set({ authenticate: value }),
  setUser: (value) => set({ user: value }),
  logout: () => set({ authenticate: false, user: null }),
}));
