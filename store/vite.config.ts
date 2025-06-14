import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    mode, // Build modunu belirler (development/production)

    cacheDir: ".vite", // Vite'ın önbellek dosyalarını saklayacağı klasör

    server: {
      port: 5004, // Geliştirme sunucusunun çalışacağı port
    },

    base: isProduction ? "/" : "http://localhost:5004/", // Uygulamanın çalışacağı temel URL

    optimizeDeps: {
      force: true, // Bağımlılıkları zorla optimize eder
      include: ["zustand"], // Zustand'ı optimize edilecek bağımlılıklar listesine ekler
    },

    build: {
      minify: true, // Kodu sıkıştırır
      sourcemap: true, // Hata ayıklama için source map oluşturur
      target: "esnext", // Modern JavaScript özelliklerini kullanır
      lib: {
        formats: ["es"], // ES modül formatında build eder
        entry: "./src/index.ts", // Giriş noktası dosyası
      },
    },

    plugins: [
      federation({
        name: "StoreApp", // Micro-frontend'in adı
        shared: ["zustand"], // Paylaşılacak bağımlılıklar
        filename: "store-app-entry.js", // Build edilecek dosya adı
        remotes: {}, // Uzak micro-frontend'ler
        exposes: {
          "./stores/theme": "./src/stores/theme/index.ts",
          "./stores/counter": "./src/stores/counter/index.ts",
        },
      }),
    ],
  };
});
