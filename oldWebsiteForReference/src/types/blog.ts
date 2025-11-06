import { z } from 'zod'

/**
 * Zod schema for blog post frontmatter validation
 * Used at build time by the Vite plugin to validate MDX frontmatter
 */
export const blogFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  publishedAt: z.string().datetime(),
  author: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),
  image: z.string().optional(),
  readingTime: z.number().optional(),
})

/**
 * TypeScript type inferred from the Zod schema
 * Ensures type safety across the codebase
 */
export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>

/**
 * Blog metadata interface
 * Contains all frontmatter fields including computed ones (like readingTime)
 * Used for blog listing pages and route loaders
 */
export interface BlogMetadata extends BlogFrontmatter {
  // Metadata only (no content)
  // All fields are inherited from BlogFrontmatter
  // This interface can be extended in the future if needed
}
