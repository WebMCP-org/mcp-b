import { promises as fs } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import React from "react";
import { CodeBlock, InlineCode } from "@/components/code-block";

/**
 * Blog post frontmatter type definition
 */
type FrontMatter = {
  title: string;
  description: string;
  date: string;
  image: string;
  authorName?: string;
  authorSrc?: string;
};

/**
 * Props for MDX code component
 */
interface MDXCodeProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

/**
 * Custom MDX components for blog posts
 * Provides syntax highlighting and professional code styling
 */
const mdxComponents = {
  // Remove default <pre> wrapper to avoid double wrapping
  pre: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),

  // Custom code component that handles both inline and block code
  code: (props: MDXCodeProps) => {
    const { className, children, ...rest } = props;

    // Inline code (no className means no language specified)
    if (!className) {
      return React.createElement(InlineCode, { children });
    }

    // Code block with syntax highlighting
    return React.createElement(CodeBlock, { className, children, ...rest });
  },
};

/**
 * Get a single blog post with rendered content and frontmatter
 * @param slug - The blog post slug (filename without .mdx extension)
 * @returns Blog content and frontmatter, or null if not found
 */
export const getSingleBlog = async (slug: string) => {
  try {
    const filePath = path.join(process.cwd(), "/data", `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, "utf-8");

    if (!fileContent) {
      return null;
    }

    const { content, frontmatter } = await compileMDX<FrontMatter>({
      source: fileContent,
      options: { parseFrontmatter: true },
      components: mdxComponents,
    });

    return { content, frontmatter };
  } catch (error) {
    console.error(`Error reading blog file for slug "${slug}":`, error);
    return null;
  }
};

/**
 * Get all blog posts with their frontmatter
 * @returns Array of blog posts with slug and frontmatter
 */
export const getBlogs = async () => {
  try {
    const dataDir = path.join(process.cwd(), "/data");
    const files = await fs.readdir(dataDir);

    // Filter for .mdx files only
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const allBlogs = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace(".mdx", "");
        const frontmatter = await getBlogFrontMatterBySlug(slug);
        return {
          slug,
          ...frontmatter,
        };
      }),
    );

    // Sort by date (newest first)
    return allBlogs.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error("Error reading blog files:", error);
    return [];
  }
};

/**
 * Get frontmatter for a single blog post without rendering content
 * @param slug - The blog post slug (filename without .mdx extension)
 * @returns Blog frontmatter, or null if not found
 */
export const getBlogFrontMatterBySlug = async (slug: string) => {
  try {
    const filePath = path.join(process.cwd(), "/data", `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, "utf-8");

    if (!fileContent) {
      return null;
    }

    const { frontmatter } = await compileMDX<FrontMatter>({
      source: fileContent,
      options: { parseFrontmatter: true },
    });

    return frontmatter;
  } catch (error) {
    console.error(`Error reading frontmatter for slug "${slug}":`, error);
    return null;
  }
};
