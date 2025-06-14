import { createTheme } from "@mui/material/styles";

import type { UIApp } from "./types";
import useThemeStore from "StoreApp/stores/theme";

const Theme = (): UIApp => {
  const { mode, toggleTheme } = useThemeStore();
  const theme = createTheme({ palette: { mode } });

  return { theme, toggleTheme };
};

export default Theme;
