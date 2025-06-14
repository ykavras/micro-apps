import React from "react";
import { CssBaseline, Button, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const App = (props: React.PropsWithChildren) => {
  const [mode, setMode] = React.useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );
  const theme = createTheme({ palette: { mode } });

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
    localStorage.setItem("theme", mode === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack alignItems="center" justifyContent="center" height="20dvh">
        <Button variant="contained" onClick={toggleTheme}>
          Toggle Theme {mode}
        </Button>
      </Stack>
      {props.children}
    </ThemeProvider>
  );
};

export default App;
