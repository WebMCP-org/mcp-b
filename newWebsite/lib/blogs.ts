import { promises as fs } from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import React from "react";
import { CodeBlock, InlineCode } from "@/components/code-block";

type FrontMatter = {
  title: string;
  description: string;
  date: string;
  image: string;
  authorName?: string;
  authorSrc?: string;
};

// Custom MDX components for blog posts
const mdxComponents = {
  pre: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  code: (props: any) => {
    // If it's an inline code (no className), use InlineCode component
    if (!props.className) {
      return React.createElement(InlineCode, props);
    }
    // Otherwise, it's a code block
    return React.createElement(CodeBlock, props);
  },
};

export const getSingleBlog = async (slug: string) => {
  try {
    const singleBlog = await fs.readFile(
      path.join(process.cwd(), "/data", `${slug}.mdx`),
      "utf-8",
    );

    if (!singleBlog) {
      return null;
    }

    const { content, frontmatter } = await compileMDX<FrontMatter>({
      source: singleBlog,
      options: { parseFrontmatter: true },
      components: mdxComponents,
    });

    return { content, frontmatter };
  } catch (error) {
    console.error(`Error reading blog file for slug "${slug}":`, error);
    return null;
  }
};

export const getBlogs = async () => {
  const files = await fs.readdir(path.join(process.cwd(), "/data"));

  const allBlogs = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(".mdx", "");
      const frontmatter = await getBlogFrontMatterBySlug(slug);
      return {
        slug,
        ...frontmatter,
      };
    }),
  );

  return allBlogs;
};

export const getBlogFrontMatterBySlug = async (slug: string) => {
  const singleBlog = await fs.readFile(
    path.join(process.cwd(), "/data", `${slug}.mdx`),
    "utf-8",
  );

  if (!singleBlog) {
    return null;
  }

  const { frontmatter } = await compileMDX<FrontMatter>({
    source: singleBlog,
    options: { parseFrontmatter: true },
  });

  return frontmatter;
};
