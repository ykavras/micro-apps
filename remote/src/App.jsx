import React from "react";
import { Button, Typography } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { Routes, Route, useNavigate } from "react-router";
//
import useCounter from "StoreApp/stores/counter";
const Header = React.lazy(() => import("HostApp/Header"));

const RemoteApp = () => {
  const counter = useCounter(useShallow((s) => s));

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Example />} />
      </Routes>
      <Button variant="contained" color="primary" onClick={counter.increment}>
        Increment
      </Button>
      <Button variant="contained" color="error" onClick={counter.decrement}>
        Decrement
      </Button>
      <Typography>{counter.count}</Typography>
    </React.Suspense>
  );
};

export default RemoteApp;

const Example = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Header />
      <h1>Remote</h1>
      <div className="card">
        <Button variant="contained" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    </div>
  );
};
