// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Production URL on Vercel (used for canonical URLs / sitemap). Update if you add a custom domain.
  site: "https://gemsteak-sajith.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
});
