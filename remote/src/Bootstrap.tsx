import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
//
import App from "./App";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <BrowserRouter basename="/remote">
    <App />
  </BrowserRouter>
);
