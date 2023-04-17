import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // configure the workbox plugin
      workbox: {
        // workbox options here
      },
      // configure the manifest options
      manifest: {
        // manifest options here
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
