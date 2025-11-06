import { Link } from '@tanstack/react-router'
import { Calendar, Clock, Tag } from 'lucide-react'
import type { BlogMetadata } from '@/types/blog'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const publishDateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeZone: 'UTC',
})

interface BlogCardProps {
  post: BlogMetadata
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const titleId = `blog-card-${post.slug}`
  const formattedPublishedDate = publishDateFormatter.format(
    new Date(post.publishedAt ?? `${post.date}T00:00:00Z`),
  )
  
  return (
    <article className="relative h-full group">
      <Card
        className={`h-full overflow-hidden rounded-xl transition-all group-hover:-translate-y-0.5 group-hover:shadow-lg ${featured ? 'border-primary' : ''}`}
      >
        {post.image && (
          <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
        )}
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {post.featured && <Badge variant="default">Featured</Badge>}
            <Badge variant="outline">
              <Calendar className="w-3 h-3 mr-1" />
              {formattedPublishedDate}
            </Badge>
            {post.readingTime && (
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                {post.readingTime} min read
              </Badge>
            )}
          </div>
          <CardTitle id={titleId} className="transition-colors group-hover:text-primary">
            {post.title}
          </CardTitle>
          <CardDescription>{post.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <Link
        to="/blogs/$slug"
        params={{ slug: post.slug }}
        aria-labelledby={titleId}
        className="absolute inset-0 block cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      />
    </article>
  )
}
