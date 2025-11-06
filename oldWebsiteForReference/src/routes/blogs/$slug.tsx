import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense, lazy } from 'react'
import { Calendar, Clock, User, Home } from 'lucide-react'
import { mdxComponents } from '@/utils/mdxComponents'
import type { MDXComponents } from 'mdx/types'
import { getBlogModuleBySlug, getBlogBySlug, generateBlogJsonLd } from '@/utils/blogUtils'
import { PageHeader } from '@/components/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const longPublishDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

// NOTE: We don't import MDXProvider - modern MDX passes components directly
// NOTE: We don't use React.lazy() - component is loaded in loader for proper SSR

export const Route = createFileRoute('/blogs/$slug')({
  loader: async ({ params }) => {
    // Get metadata
    const post = getBlogBySlug(params.slug)
    
    if (!post) {
      throw notFound()
    }

    // Verify the MDX module exists
    const moduleImporter = getBlogModuleBySlug(params.slug)
    
    if (!moduleImporter) {
      throw notFound()
    }

    // IMPORTANT: Only return serializable data from the loader
    // The MDX component will be loaded in the component itself
    return {
      post,
      slug: params.slug
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [], scripts: [] }
    const { post } = loaderData
    
    // Generate JSON-LD structured data for SEO
    const jsonLd = generateBlogJsonLd(post)
    
    return {
      meta: [
        { title: `${post.title} - MCP-B Blog` },
        { name: 'description', content: post.description },
        { name: 'keywords', content: post.tags.join(', ') },
        { name: 'robots', content: 'index,follow' },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.description },
        { property: 'article:published_time', content: post.publishedAt },
        { property: 'article:author', content: post.author },
        { property: 'article:tag', content: post.tags[0] },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: post.title },
        { name: 'twitter:description', content: post.description },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(jsonLd),
        },
      ],
    }
  },
  component: BlogPostPage,
  notFoundComponent: BlogNotFound,
})

function BlogPostPage() {
  const { post, slug } = Route.useLoaderData()
  const formattedPublishedDate = longPublishDateFormatter.format(
    new Date(post.publishedAt ?? `${post.date}T00:00:00Z`),
  )
  
  // Load the MDX component dynamically in the component
  // This is client-side only and won't be serialized
  const moduleImporter = getBlogModuleBySlug(slug)
  if (!moduleImporter) {
    throw notFound()
  }
  
  // Use lazy for client-side code splitting
  // Type assertion needed because React.lazy doesn't preserve component prop types
  const MDXContent = lazy(() => moduleImporter()) as React.ComponentType<{ components: MDXComponents }>

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-20 left-10 h-48 w-48 sm:h-64 sm:w-64 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 h-64 w-64 sm:h-80 sm:w-80 bg-gradient-to-br from-blue-600/15 to-primary/15 rounded-full blur-3xl animate-float-delayed" />
      
      {/* Navigation bar */}
      <div className="container mx-auto px-6 pt-8 pb-4 max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <Link to="/blogs">
            <Button variant="ghost" size="sm">
              ← Back to Blogs
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Article header */}
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Article title */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {post.title}
        </h1>
        
        {/* Article description */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-6">
          {post.description}
        </p>
        
        {/* Article metadata */}
        <div className="flex flex-wrap gap-3 items-center text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formattedPublishedDate}
          </div>
          {post.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>
      
      {/* MDX Content */}
      <article className="container mx-auto px-6 pb-32 max-w-3xl">
        <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none">
          
          <ErrorBoundary
            fallback={
              <div className="p-8 border border-red-500/50 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                  Error Loading Blog Post
                </h2>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  There was a problem rendering this blog post. This might be due to:
                </p>
                <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400 space-y-1">
                  <li>Invalid MDX syntax</li>
                  <li>Missing component in mdxComponents.tsx</li>
                  <li>Broken image or asset path</li>
                  <li>Component error during render</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  Check the browser console for more details.
                </p>
              </div>
            }
          >
            {/* Suspense needed for lazy-loaded MDX component */}
            {/* Pass components directly to MDX component (modern MDX v3 approach) */}
            <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading post content...</div>}>
              <MDXContent components={mdxComponents} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </article>
    </div>
  )
}

function BlogNotFound() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col items-center justify-center">
      {/* Background gradient blobs */}
      <div className="absolute top-20 left-10 h-48 w-48 sm:h-64 sm:w-64 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 h-64 w-64 sm:h-80 sm:w-80 bg-gradient-to-br from-blue-600/15 to-primary/15 rounded-full blur-3xl animate-float-delayed" />
      
      <div className="text-center z-10">
        <PageHeader
          title="Blog Post Not Found"
          description="The blog post you're looking for doesn't exist or may have been moved"
          titleClassName="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          descriptionClassName="text-muted-foreground"
        />
        
        <div className="mt-8 space-y-4">
          <Link to="/blogs">
            <Button size="lg" className="mr-4">
              View All Posts
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="outline">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
