import React from "react";
import { useShallow } from "zustand/react/shallow";
import { Routes, Route, useNavigate, Outlet } from "react-router";
import {
  Card,
  Stack,
  Button,
  CardActions,
  CardContent,
  CssBaseline,
  Typography,
  ThemeProvider,
} from "@mui/material";

//
import uiApp from "UIApp/App";
import useCounter from "StoreApp/stores/counter";

const RemoteApp = React.lazy(() => import("RemoteApp/App"));

function App() {
  const { theme } = uiApp();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Suspense fallback={<div>Loading...</div>}>
        <CustomRouter />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;

const Example = () => {
  const navigate = useNavigate();
  const { toggleTheme } = uiApp();
  const counter = useCounter(useShallow((s) => s));

  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="subtitle1">Host Application</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={toggleTheme}>
          Theme
        </Button>
        <Button variant="outlined" onClick={() => navigate("/remote")}>
          Remote
        </Button>
      </Stack>
      <Card>
        <CardContent>
          <Typography variant="h1" align="center">
            {counter.count}
          </Typography>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" color="primary" onClick={counter.increment}>
            Increment
          </Button>
          <Button fullWidth variant="contained" color="error" onClick={counter.decrement}>
            Decrement
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
};

const CustomRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Example />} />
        <Route path="/remote/*" element={<RemoteApp />} />
      </Route>
      <Route path="*" element={<Typography>Not found</Typography>} />
    </Routes>
  );
};
