import type { ThemeOptions } from "@mui/material";

export interface UIApp {
  theme: ThemeOptions;
  toggleTheme: () => void;
}
