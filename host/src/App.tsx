import React from "react";
import { useShallow } from "zustand/react/shallow";
import { Routes, Route, useNavigate, Outlet, Navigate } from "react-router";
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
import GuestGuard from "./guards/GuestGuard";
import AuthGuard from "./guards/AuthGuard";
//
import uiApp from "UIApp/theme";
import useAuthStore from "StoreApp/stores/auth";
import useCounterStore from "StoreApp/stores/counter";

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

const CustomRouter = () => {
  const { login, logout } = useAuthStore(useShallow((s) => s));

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <GuestGuard>
            <Outlet />
          </GuestGuard>
        }
      >
        <Route index element={<Navigate to="login" />} />
        <Route
          path="login"
          element={
            <>
              <Typography variant="subtitle1">Login</Typography>
              <Button variant="outlined" onClick={login}>
                Login
              </Button>
            </>
          }
        />
        <Route path="register" element={<Typography variant="subtitle1">Register</Typography>} />
      </Route>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Button variant="outlined" onClick={logout}>
              Logout
            </Button>
            <Outlet />
          </AuthGuard>
        }
      >
        <Route index element={<Example />} />
        <Route path="/remote/*" element={<RemoteApp />} />
      </Route>
      <Route path="*" element={<Typography>Not found</Typography>} />
    </Routes>
  );
};

const Example = () => {
  const navigate = useNavigate();
  const { toggleTheme } = uiApp();
  const counter = useCounterStore(useShallow((s) => s));

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
