import { Container } from "@/components/container";
import { Metadata } from "next";
import { getBlogFrontMatterBySlug, getSingleBlog } from "@/lib/blogs";
import { redirect } from "next/navigation";
import { DivideX } from "@/components/divide";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = await params;
  const frontmatter = await getBlogFrontMatterBySlug(data.slug);

  if (!frontmatter) {
    return {
      title: "Blog not found",
    };
  }

  return {
    title: frontmatter.title + " by Manu Arora",
    description: frontmatter.description,
  };
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = await params;
  const blog = await getSingleBlog(data.slug);

  if (!blog) {
    redirect("/blog");
  }

  const { content, frontmatter } = blog;

  console.log(frontmatter);

  return (
    <div>
      <DivideX />
      <Container className="border-divide border-x px-8 pt-10 md:pt-20 md:pb-10">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← Back to Blog
        </Link>
        <img
          src={frontmatter.image}
          alt={frontmatter.title}
          className="rouned-full mx-auto mb-20 max-h-96 w-full max-w-2xl rounded-2xl object-cover shadow-xl"
        />
        <div className="prose prose-base dark:prose-invert mx-auto">
          {content}
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl items-center gap-4 border-t border-gray-200 pt-8 dark:border-neutral-800">
          <span className="text-sm text-gray-600 dark:text-neutral-400">Share:</span>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://mcp-b.ai/blog/${data.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
            </svg>
            Share on LinkedIn
          </a>
          <a
            href={`https://news.ycombinator.com/submitlink?u=${encodeURIComponent(`https://mcp-b.ai/blog/${data.slug}`)}&t=${encodeURIComponent(frontmatter.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-5.064l4.111-7.708h-1.583l-3.333 6.278-3.333-6.278z"/>
            </svg>
            Discuss on HN
          </a>
        </div>
      </Container>
      <DivideX />
    </div>
  );
}
