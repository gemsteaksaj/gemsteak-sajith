// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Set this to your real domain once it's live on Vercel (used for canonical URLs / sitemap).
  site: "https://gemsteak.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
});
