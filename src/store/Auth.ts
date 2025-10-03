/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type UserInformation = {
  email: string;
  name: string;
  picture: string;
};
interface AuthStore {
  authenticate: boolean;
  user: UserInformation;
  setAuthenticate: (value: boolean) => void;
  setUser: (value: any) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authenticate: false,
  user: {} as UserInformation,
  setAuthenticate: (value) => set({ authenticate: value }),
  setUser: (value) => set({ user: value }),
}));
