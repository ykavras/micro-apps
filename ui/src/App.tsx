import React from "react";
import { CssBaseline, Button, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const App = (props: React.PropsWithChildren) => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const theme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack alignItems="center" justifyContent="center" height="20dvh">
        <Button variant="contained" onClick={() => setMode(mode === "light" ? "dark" : "light")}>
          Toggle Theme {mode}
        </Button>
      </Stack>
      {props.children}
    </ThemeProvider>
  );
};

export default App;
