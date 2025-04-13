import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import slugify from "slugify"; // You'll need to install this

interface Page {
  title: string;
  path: string;
  content: string;
  headings: Heading[];
}

interface Heading {
  level: number;
  text: string;
}

const parseMarkdownFiles = (dirPath: string): Page[] => {
  const files = fs.readdirSync(dirPath);
  let pages: Page[] = [];

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.lstatSync(fullPath);

    if (stat.isDirectory()) {
      pages = pages.concat(parseMarkdownFiles(fullPath)); // Recurse through subfolders
    } else if (file.endsWith(".md")) {
      const fileContent = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(fileContent);

      const parsedContent = unified()
        .use(remarkParse)
        .use(remarkHtml)
        .processSync(content)
        .toString();

      pages.push({
        title: data.title || "Untitled",
        path: fullPath.replace(/src\/pages\//, "/").replace(".md", ""),
        content: parsedContent,
        headings: extractHeadings(content),
      });
    }
  });

  return pages;
};

// Function to extract headings (and sub-headings)
const extractHeadings = (content: string): Heading[] => {
  const headings: Heading[] = [];
  const headingRegex = /^(#{1,6})\s+(.*)/gm;

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length, // Number of `#` marks
      text: match[2],
    });
  }

  return headings;
};

const buildSearchIndex = (pages: Page[]) => {
  const searchIndex: any[] = [];

  pages.forEach((page) => {
    const basePath = page.path;

    // Add page entry
    searchIndex.push({
      id: `page-${basePath}`,
      type: "page",
      title: page.title,
      content: page.content,
      path: basePath,
    });

    // Add heading entries
    page.headings.forEach((heading, index) => {
      const headingSlug = slugify(heading.text, { lower: true, strict: true });

      searchIndex.push({
        id: `heading-${basePath}-${index}`,
        type: "heading",
        title: heading.text,
        content: heading.text,
        parentPage: basePath,
        path: `${basePath}#${headingSlug}`, // 👈 this adds the anchor
      });
    });
  });

  return searchIndex;
};

// Main function to parse markdown and generate the JSON
const generateSearchIndex = () => {
  const pages = parseMarkdownFiles("./src/pages");
  const searchIndex = buildSearchIndex(pages);

  // Save the search index as a JSON file in the `public/` directory
  fs.writeFileSync(
    "./public/search-index.json",
    JSON.stringify(searchIndex, null, 2)
  );
};

generateSearchIndex();
