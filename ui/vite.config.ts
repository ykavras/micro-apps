import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    mode,
    build: {
      target: "esnext",
      minify: false,
      sourcemap: true,
    },
    base: isProduction ? "/" : "http://localhost:5003/",
    server: {
      port: 5003,
    },
    cacheDir: ".vite",
    optimizeDeps: {
      force: true,
      include: ["react", "react-dom"],
    },
    plugins: [
      federation({
        name: "UIApp",
        filename: "ui-app-entry.js",
        shared: ["react", "react-dom", "@mui/material", "@emotion/react", "@emotion/styled"],
        //
        remotes: {},
        exposes: { "./App": "./src/App.tsx" },
      }),
    ],
  };
});
