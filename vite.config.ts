import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        // workbox options here
      },
      manifest: {
        // manifest options here
        display: "standalone",
        icons: [
          {
            src: "./src/assets/logo.svg",
            sizes: "192x192",
            type: "image/svg",
          },
          {
            src: "./src/assets/logo.svg",
            sizes: "512x512",
            type: "image/svg",
          },
        ],
      },
    }),
  ],
});