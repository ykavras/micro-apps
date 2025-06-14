import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
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
    base: isProduction ? "/" : "http://localhost:5001/",
    server: {
      port: 5001,
    },
    cacheDir: ".vite",
    optimizeDeps: {
      force: true,
      include: ["react", "react-dom", "react-router"],
    },
    plugins: [
      react(),
      federation({
        name: "HostApp",
        filename: "host-app-entry.js",
        shared: ["react", "react-dom", "react-router", "zustand"],
        exposes: {
          "./App": "./src/App",
          "./Header": "./src/components/header.tsx",
        },
        remotes: {
          UIApp: "http://localhost:5003/assets/ui-app-entry.js",
          StoreApp: "http://localhost:5004/assets/store-app-entry.js",
          RemoteApp: "http://localhost:5002/assets/remote-app-entry.js",
        },
      }),
    ],
  };
});
