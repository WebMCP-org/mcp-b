import type { MDXComponents } from 'mdx/types'
import { LazyCodeBlock } from '@/components/CodeBlockLazy'
import { BlogImage } from '@/components/BlogImage'
import { WebMCPArchitectureDiagram } from '@/components/diagrams'
import { NumberedList, InlineCode } from '@/components/NumberedList'
import { Store, ExternalLink } from 'lucide-react'
import { GetInvolvedCallout } from '@/components/GetInvolvedCallout'

/**
 * Components available in all MDX files.
 * 
 * IMPORTANT: With modern MDX (v3+), we pass these components directly to the 
 * MDX component rather than using MDXProvider. This is more efficient and 
 * works better with React Server Components.
 * 
 * Usage in route:
 *   <MDXContent components={mdxComponents} />
 * 
 * NOT:
 *   <MDXProvider components={mdxComponents}>
 *     <MDXContent />
 *   </MDXProvider>
 * 
 * PERFORMANCE: CodeBlock is lazy-loaded to move react-syntax-highlighter 
 * (~779 KB) out of the critical path, improving Time to Interactive by ~800ms.
 */
export const mdxComponents: MDXComponents = {
  // Custom components (CodeBlock is lazy-loaded for performance)
  CodeBlock: LazyCodeBlock,
  BlogImage,
  WebMCPArchitectureDiagram,
  NumberedList,
  InlineCode,
  GetInvolvedCallout,
  
  // Lucide icons
  Store,
  ExternalLink,
  
  // You can override default HTML elements too
  pre: (props) => <div {...props} />, // Disable default pre styling
  code: (props) => <code className="text-sm bg-muted px-1 py-0.5 rounded" {...props} />,
  
  // Add more as needed
}
