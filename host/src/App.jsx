import React, { Suspense } from "react";
import { useShallow } from "zustand/react/shallow";
import { Routes, Route, useNavigate, Outlet } from "react-router";
import { Button, Card, CardContent, Typography, useTheme } from "@mui/material";

//
import useCounter from "StoreApp/stores/counter";
const UIApp = React.lazy(() => import("UIApp/App"));
const RemoteApp = React.lazy(() => import("RemoteApp/App"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UIApp>
        <CustomRouter />
      </UIApp>
    </Suspense>
  );
}

export default App;

const Example = () => {
  const navigate = useNavigate();

  const counter = useCounter(useShallow((s) => s));

  const { palette } = useTheme();

  console.log(palette.mode);

  return (
    <>
      <h1>Host Application</h1>
      <Card>
        <CardContent>
          <Button variant="contained" color="primary" onClick={counter.increment}>
            Increment
          </Button>
          <Button variant="contained" color="error" onClick={counter.decrement}>
            Decrement
          </Button>
          <Typography variant="h1">{counter.count}</Typography>
        </CardContent>
      </Card>
      <Button variant="contained" onClick={() => navigate("/remote")}>
        Remote
      </Button>
    </>
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
