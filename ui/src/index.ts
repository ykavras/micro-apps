import React from "react";
import { createTheme } from "@mui/material/styles";

import useTheme from "StoreApp/stores/theme";

const App = () => {
  const { mode, toggleTheme } = useTheme();
  const theme = createTheme({ palette: { mode } });

  return { theme, toggleTheme };
};

export default App;
