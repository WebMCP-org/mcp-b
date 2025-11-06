import type { ComponentType } from 'react'
import type { BlogFrontmatter, BlogMetadata } from '@/types/blog'
import { BLOG_METADATA } from './blog-metadata.generated'

/**
 * CRITICAL CLOUDFLARE WORKERS OPTIMIZATION:
 * 
 * We load pre-parsed metadata from blog-metadata.generated.ts which is created at BUILD TIME
 * by the Vite plugin. This avoids:
 * - Loading ALL raw MDX content into the bundle (500KB+ for 10 posts)
 * - Parsing frontmatter at runtime (cold start latency)
 * - Runtime dependencies on gray-matter and reading-time
 * 
 * Instead, metadata is parsed once during build and included as a tiny JSON object (~2KB per post).
 */

/**
 * Vite registers every MDX file at build time without eagerly bundling them.
 * No Node.js `fs` access is required, which keeps this compatible with Cloudflare Workers
 * while still allowing per-post code splitting.
 * 
 * IMPORTANT: We use absolute path alias (@/content) instead of relative paths
 * to ensure proper resolution during build and SSR.
 */
const blogModuleMap = import.meta.glob<{
  default: ComponentType
}>('@/content/blogs/*.mdx')

/**
 * Normalize the slug from the file path: "@/content/blogs/mcp-b-introduction.mdx" -> "mcp-b-introduction"
 */
function getSlugFromPath(filePath: string) {
  return filePath.split('/').pop()!.replace('.mdx', '')
}

/**
 * Cache for blog metadata - sorted once, reused for all requests.
 * In Cloudflare Workers, this persists for the lifetime of the Worker instance.
 */
let cachedMetadata: BlogMetadata[] | null = null

/**
 * Get all blog post metadata (for listing pages)
 * Does NOT return full MDX components - lightweight for performance
 * 
 * PERFORMANCE: Metadata is pre-parsed at build time, so this is just a sort operation.
 */
export function getAllBlogMetadata(): BlogMetadata[] {
  // Return cached version if available
  if (cachedMetadata) {
    return cachedMetadata
  }

  // BLOG_METADATA comes from build-time generation - no runtime parsing!
  // Create a mutable copy since BLOG_METADATA is readonly
  cachedMetadata = sortPosts([...BLOG_METADATA] as unknown as BlogMetadata[])
  return cachedMetadata
}

/**
 * Sort posts by featured status, then date
 * 
 * CRITICAL FOR CLOUDFLARE WORKERS: Use import.meta.env.DEV which Vite replaces at build time.
 * This is NOT a runtime check - Vite replaces this with a boolean literal during build:
 * - Production: const isDevelopment = false
 * - Development: const isDevelopment = true
 * 
 * This enables proper dead code elimination and works in ANY JavaScript runtime.
 */
export function sortPosts<T extends Pick<BlogFrontmatter, 'featured' | 'publishedAt' | 'draft'>>(
  posts: T[]
): T[] {
  // Vite replaces import.meta.env.DEV with a literal true/false at build time
  const isDevelopment = import.meta.env.DEV
  
  return posts
    .filter(post => !post.draft || isDevelopment)
    .sort((a, b) => {
      // Featured first
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Then by date (newest first)
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
}

/**
 * Get blog post by slug
 */
export function getBlogBySlug(slug: string): BlogMetadata | null {
  return getAllBlogMetadata().find(p => p.slug === slug) || null
}

/**
 * Filter posts by tag
 */
export function getPostsByTag(tag: string): BlogMetadata[] {
  return getAllBlogMetadata().filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllBlogMetadata()
  const tags = new Set<string>()
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags).sort()
}

/**
 * Helper to retrieve the MDX module importer for a given slug.
 * Returns a function that dynamically imports the MDX file.
 * 
 * IMPORTANT: For Cloudflare Workers SSR, call this function and await the result
 * in the route loader, don't use React.lazy() with it.
 */
export function getBlogModuleBySlug(slug: string) {
  for (const [filePath, importer] of Object.entries(blogModuleMap)) {
    if (getSlugFromPath(filePath) === slug) {
      return importer
    }
  }

  return null
}

/**
 * Clear the metadata cache (useful for testing or hot reload in development)
 */
export function clearBlogCache() {
	cachedMetadata = null
}

/**
 * Generate JSON-LD structured data for a blog post
 * This improves SEO by providing structured data to search engines
 * 
 * @see https://schema.org/BlogPosting
 */
export function generateBlogJsonLd(post: BlogMetadata, baseUrl = 'https://mcp-b.ai') {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.description,
		author: {
			'@type': 'Person',
			name: post.author,
		},
		datePublished: post.publishedAt,
		dateModified: post.publishedAt, // Could add updatedAt field to frontmatter later
		keywords: post.tags.join(', '),
		url: `${baseUrl}/blogs/${post.slug}`,
		image: post.image ? `${baseUrl}${post.image}` : undefined,
		publisher: {
			'@type': 'Organization',
			name: 'MCP-B',
			logo: {
				'@type': 'ImageObject',
				url: `${baseUrl}/logo.png`, // Update with actual logo path
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${baseUrl}/blogs/${post.slug}`,
		},
	}
}
