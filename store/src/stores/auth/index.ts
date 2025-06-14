import { create } from "zustand";
//
import type { AuthStore } from "./types";

const useAuthStore = create<AuthStore>((set) => ({
  tokens: null,
  isAuthenticated: false,

  // actions
  logout: () => set({ tokens: null, isAuthenticated: false }),
  login: () => {
    set({ isAuthenticated: true, tokens: { accessToken: "123", refreshToken: "456" } });
  },
}));

export default useAuthStore;
