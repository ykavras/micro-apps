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
    base: isProduction ? "/" : "http://localhost:5002/",
    server: {
      port: 5002,
    },
    cacheDir: ".vite",
    optimizeDeps: {
      force: true,
      include: ["react", "react-dom", "react-router"],
    },
    plugins: [
      react(),
      federation({
        name: "RemoteApp",
        filename: "remote-app-entry.js",
        shared: ["react", "react-dom", "react-router", "zustand"],
        exposes: { "./App": "./src/App" },
        remotes: {
          UIApp: "http://localhost:5003/assets/ui-app-entry.js",
          HostApp: "http://localhost:5001/assets/host-app-entry.js",
          StoreApp: "http://localhost:5004/assets/store-app-entry.js",
        },
      }),
    ],
  };
});
