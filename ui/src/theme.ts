import { createTheme } from "@mui/material/styles";

import type { UIApp } from "./types";
import useTheme from "StoreApp/stores/theme";

const Theme = (): UIApp => {
  const { mode, toggleTheme } = useTheme();
  const theme = createTheme({ palette: { mode } });

  return { theme, toggleTheme };
};

export default Theme;
