// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import remarkToc from "remark-toc";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://mohamed82008.github.io/",
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: "content", maxDepth: 2, ordered: true }],
    ],
  },
  integrations: [icon(), svelte()],
});
