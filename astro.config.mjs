// @ts-check
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://mohamed82008.github.io/",
  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: "content", maxDepth: 2, ordered: true }],
    ],
  },
  integrations: [icon()],
});
