// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [ [remarkToc, { heading: "content", maxDepth: 2, ordered: true} ] ],
  }
});
