import { create } from "zustand";
import { persist } from "zustand/middleware";
//
import { ThemeStore } from "./types";

const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "light",
      toggleTheme: () => set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
    }),
    { name: "theme" }
  )
);

export default useTheme;
