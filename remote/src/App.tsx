import React from "react";
import { useShallow } from "zustand/react/shallow";
import { Routes, Route, useNavigate } from "react-router";
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
import uiApp from "UIApp/theme";
import axios from "HostApp/request";
import useCounterStore from "StoreApp/stores/counter";

const RemoteApp = () => {
  const { theme } = uiApp();
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Example />} />
          <Route
            path="/detail"
            element={
              <>
                <Typography>Detail</Typography>
                <Button variant="outlined" onClick={() => navigate("/")}>
                  Host
                </Button>
              </>
            }
          />
        </Routes>
      </React.Suspense>
    </ThemeProvider>
  );
};

export default RemoteApp;

const Example = () => {
  const navigate = useNavigate();
  const { toggleTheme } = uiApp();
  const counter = useCounterStore(useShallow((s) => s));

  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="subtitle1">Remote Application</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={toggleTheme}>
          Theme
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Host
        </Button>
        <Button variant="outlined" onClick={() => navigate("detail")}>
          Detail
        </Button>
        <Button variant="outlined" onClick={() => axios.get("/api/test")}>
          Test
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
