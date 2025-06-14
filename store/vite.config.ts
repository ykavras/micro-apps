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
    base: isProduction ? "/" : "http://localhost:5004/",
    server: {
      port: 5004,
    },
    cacheDir: ".vite",
    optimizeDeps: {
      force: true,
      include: ["react", "react-dom"],
    },
    plugins: [
      federation({
        name: "StoreApp",
        shared: ["zustand"],
        filename: "store-app-entry.js",
        //
        remotes: {},
        exposes: { "./stores/counter": "./src/stores/counter/index.ts" },
      }),
    ],
  };
});
