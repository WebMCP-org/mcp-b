import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '@/components/PageHeader'
import { BlogCard } from '@/components/BlogCard'
import { getAllBlogMetadata } from '@/utils/blogUtils'

export const Route = createFileRoute('/blogs/')({
  head: ({ loaderData }) => {
    // Generate JSON-LD structured data for blog listing page
    const baseUrl = 'https://mcp-b.ai'
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'MCP-B Blog',
      description: 'Latest updates, insights, and tutorials about the Browser Model Context Protocol.',
      url: `${baseUrl}/blogs`,
      publisher: {
        '@type': 'Organization',
        name: 'MCP-B',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
      },
      blogPost: loaderData?.posts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url: `${baseUrl}/blogs/${post.slug}`,
        datePublished: post.publishedAt,
        author: {
          '@type': 'Person',
          name: post.author,
        },
      })) || [],
    }
    
    return {
      meta: [
        { title: 'Blog - MCP-B' },
        {
          name: 'description',
          content: 'Latest updates, insights, and tutorials about the Browser Model Context Protocol.',
        },
        {
          name: 'keywords',
          content: 'MCP-B blog, Model Context Protocol news, Browser automation updates, AI integration tutorials',
        },
        { name: 'robots', content: 'index,follow' },
        { property: 'og:type', content: 'blog' },
        { property: 'og:title', content: 'Blog - MCP-B' },
        {
          property: 'og:description',
          content: 'Latest updates, insights, and tutorials about the Browser Model Context Protocol.',
        },
        { property: 'og:image', content: '/vite.svg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Blog - MCP-B' },
        {
          name: 'twitter:description',
          content: 'Latest updates, insights, and tutorials about the Browser Model Context Protocol.',
        },
        { name: 'twitter:image', content: '/vite.svg' },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(jsonLd),
        },
      ],
    }
  },
  loader: async () => {
    // Direct import - no server function needed for static data
    const posts = getAllBlogMetadata()
    return { posts }
  },
  component: BlogListingPage,
})

function BlogListingPage() {
  const { posts } = Route.useLoaderData()
  
  const featuredPosts = posts.filter(p => p.featured)
  const regularPosts = posts.filter(p => !p.featured)
  
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-20 left-10 h-48 w-48 sm:h-64 sm:w-64 lg:h-72 lg:w-72 bg-gradient-to-br from-primary/20 sm:from-primary/25 lg:from-primary/30 to-blue-600/20 sm:to-blue-600/25 lg:to-blue-600/30 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 bg-gradient-to-br from-blue-600/15 sm:from-blue-600/20 to-primary/15 sm:to-primary/20 rounded-full blur-3xl animate-float-delayed" />
      
      <PageHeader
        title="Blog"
        description="Latest updates, insights, and tutorials about MCP-B"
        titleClassName="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
        descriptionClassName="text-muted-foreground"
      />
      
      <div className="container mx-auto px-6 py-12">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map(post => (
                <BlogCard key={post.slug} post={post} featured />
              ))}
            </div>
          </section>
        )}
        
        {/* All Posts */}
        <section>
          <h2 className="text-3xl font-bold mb-8">
            {featuredPosts.length > 0 ? 'All Posts' : 'Posts'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
        
        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
