export type ThemeMode = "light" | "dark";

export interface ThemeStore {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export interface ThemeState {
  mode: ThemeMode;
}
