# Blog Posts

This directory contains all blog posts for the MCP-B website. Posts are written in MDX format, which allows you to use Markdown syntax alongside React components.

## Technical Overview

- **Content pipeline**: `vite-plugin-blog-metadata.ts` scans MDX files at build time, validates frontmatter, and emits a metadata manifest consumed by utilities in `src/utils/blogUtils.ts`.
- **Routing**: `src/routes/blogs/index.tsx` renders the listing view, while `src/routes/blogs/$slug.tsx` streams individual posts via TanStack Start loaders and dynamically imports the compiled MDX module for SSR-safe hydration.
- **MDX runtime**: `src/utils/mdxComponents.tsx` registers shared components (e.g., `BlogImage`, `NumberedList`, `InlineCode`, `GetInvolvedCallout`, diagrams) and lazy-loads the heavy `CodeBlock` implementation to trim the critical bundle.
- **Presentation components**: `BlogCard`, `PageHeader`, and `BlogImage` provide consistent theming; `BlogImage` includes error states, variant styling, and a lightbox for zoomable media.
- **Developer experience**: Frontmatter schema enforcement, automatic reading-time and metadata generation, plus reusable callouts and diagrams let authors focus on content while keeping posts performant and consistent.

## Adding a New Blog Post

1. Create a new `.mdx` file in this directory with a descriptive slug-based filename (e.g., `my-awesome-post.mdx`)
2. Add the required frontmatter (see schema below)
3. Write your content using Markdown
4. Use React components directly (no imports needed!)
5. Test locally with `pnpm dev`
6. Commit and deploy

## Frontmatter Schema

Every blog post must include valid frontmatter at the top of the file:

```yaml
---
title: "Your Post Title"                    # Required - SEO and display
slug: "your-post-slug"                      # Required - URL path (lowercase, hyphens only)
date: "2025-01-15"                          # Required - Display date (YYYY-MM-DD)
publishedAt: "2025-01-15T10:00:00Z"        # Required - ISO 8601 datetime for sorting
author: "Author Name"                       # Required - Display name
description: "SEO-optimized description"    # Required - 50-300 characters
tags: ["tag1", "tag2", "tag3"]             # Required - Array of strings
featured: false                             # Optional - Show in featured section (default: false)
draft: false                                # Optional - Hide in production (default: false)
image: "/images/blog/cover-image.png"      # Optional - Cover image for cards
---
```

### Frontmatter Field Details

- **title**: Displayed in page header, browser title, and blog cards
- **slug**: Must match the filename (without `.mdx`), used in URL (`/blogs/{slug}`)
- **date**: Human-readable date shown on the post
- **publishedAt**: ISO 8601 datetime used for sorting (newest first)
- **author**: Author's name displayed with the post
- **description**: Used for meta tags, blog cards, and SEO
- **tags**: Categorize your post (e.g., `["mcp", "security", "tutorial"]`)
- **featured**: Set to `true` to highlight in the featured posts section
- **draft**: Set to `true` to hide the post in production (visible in dev mode)
- **image**: Optional cover image for the blog listing page

## Available Components

All components are pre-registered and ready to use. **DO NOT import them in your MDX files!**

### CodeBlock

Displays syntax-highlighted code with language detection:

```mdx
<CodeBlock 
  language="typescript" 
  code={`
const example = "Hello World";
console.log(example);
`} 
/>
```

**Props:**
- `language` (required): Programming language for syntax highlighting
- `code` (required): Code content as a string

### BlogImage

Optimized images with captions and variants:

```mdx
<!-- Basic usage -->
<BlogImage 
  src="/images/blog/demo.gif" 
  alt="Demo of MCP-B" 
/>

<!-- With caption -->
<BlogImage 
  src="/images/blog/architecture.png" 
  alt="System Architecture"
  caption="Figure 1: Complete MCP-B architecture"
/>

<!-- Light background variant (for diagrams) -->
<BlogImage 
  src="/images/blog/diagram.png" 
  alt="Flow Diagram"
  caption="Figure 2: Data flow between components"
  variant="light-bg"
/>
```

**Props:**
- `src` (required): Absolute path to image (see Image Guidelines below)
- `alt` (required): Alternative text for accessibility
- `caption` (optional): Caption displayed below the image
- `variant` (optional): `"default"` or `"light-bg"` (use light-bg for diagrams)
- `className` (optional): Additional CSS classes

### NumberedList

A styled numbered list component for step-by-step explanations:

```mdx
<!-- Default dark variant -->
<NumberedList items={[
  { content: "First step in the process" },
  { content: <>Second step with <InlineCode>code example</InlineCode></> },
  { content: "Third step description" }
]} />

<!-- Light variant for getting started guides -->
<NumberedList variant="light" items={[
  { content: "First step" },
  { content: "Second step" }
]} />
```

**Features:**
- Two variants: `dark` (default) and `light`
- Circular numbered badges
- Responsive spacing
- Support for inline code with `InlineCode` component
- Can contain complex content (links, CodeBlocks, icons)

**Props:**
- `items` (required): Array of objects with `content` (string or JSX)
- `variant` (optional): `"dark"` or `"light"` (default: `"dark"`)
- `className` (optional): Additional CSS classes

### InlineCode

Helper component for inline code within NumberedList or regular text:

```mdx
<InlineCode>function_name</InlineCode>
```

### Using `not-prose` for Custom Styled Components

When you create custom styled components with specific colors, spacing, and typography, you need to prevent Tailwind Typography's prose styles from interfering. Add the `not-prose` class to the outermost div:

```mdx
<!-- ✅ CORRECT: Custom styled div with not-prose -->
<div className="not-prose bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8">
  <h3 className="text-xl font-bold mb-4">Custom Heading</h3>
  <p className="text-gray-700">Custom styled paragraph</p>
</div>

<!-- ❌ WRONG: Without not-prose, prose styles will override your custom colors -->
<div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8">
  <h3 className="text-xl font-bold mb-4">Custom Heading</h3>
  <p className="text-gray-700">This text color will be overridden by prose styles</p>
</div>
```

**When to use `not-prose`:**
- Custom call-out boxes with specific background colors
- Custom cards with gradient backgrounds
- Components with precise spacing and typography
- Any div where you want complete control over styling

**Note:** Pre-registered components like `NumberedList` already include `not-prose` internally, so you don't need to add it when using them.

### Custom Diagrams

Custom diagram components are also available (e.g., `WebMCPArchitectureDiagram`):

```mdx
<WebMCPArchitectureDiagram />
```

## Image Guidelines

### ✅ CORRECT Usage

**Always use absolute paths starting with `/`:**

```mdx
<!-- Standard markdown image -->
![Demo Screenshot](/images/blog/screenshot.png)

<!-- BlogImage component (recommended) -->
<BlogImage 
  src="/images/blog/demo.gif" 
  alt="Demo Animation" 
/>

<!-- With caption -->
<BlogImage 
  src="/images/blog/architecture.png" 
  alt="Architecture Diagram"
  caption="Figure 1: System overview"
/>

<!-- Light background for diagrams -->
<BlogImage 
  src="/images/blog/diagram.png" 
  alt="Data Flow"
  variant="light-bg"
/>
```

### ❌ INCORRECT Usage

**Never use imports or relative paths:**

```mdx
<!-- ❌ WRONG: Don't import assets -->
import MyImage from '../../assets/image.png'

<!-- ❌ WRONG: Don't use relative paths -->
<img src="../../assets/image.png" />
<BlogImage src="../images/demo.gif" />

<!-- ❌ WRONG: Don't reference src/assets -->
<BlogImage src="/src/assets/image.png" />
```

### Image Organization

Store all blog images in `/public/images/blog/`:

```
public/
└── images/
    └── blog/
        ├── mcp-b-intro-cover.png
        ├── architecture-diagram.png
        ├── demo.gif
        └── post-slug/          # Optional: organize by post
            ├── screenshot-1.png
            └── screenshot-2.png
```

## Component Usage Examples

### Full Example Blog Post

```mdx
---
title: "Building Secure MCP Servers"
slug: "building-secure-mcp-servers"
date: "2025-01-20"
publishedAt: "2025-01-20T10:00:00Z"
author: "Mike"
description: "Learn best practices for building secure MCP servers in the browser"
tags: ["mcp", "security", "tutorial"]
featured: true
draft: false
image: "/images/blog/security-cover.png"
---

# Building Secure MCP Servers

This guide covers security best practices for MCP servers.

## Architecture Overview

<BlogImage 
  src="/images/blog/security-architecture.png" 
  alt="Security Architecture"
  caption="Figure 1: Secure MCP architecture with browser sandbox"
  variant="light-bg"
/>

## Code Example

Here's how to implement secure authentication:

<CodeBlock 
  language="typescript" 
  code={`
interface SecureConfig {
  apiKey: string;
  allowedOrigins: string[];
}

function validateRequest(config: SecureConfig) {
  // Implementation here
  return true;
}
`} 
/>

## Demo

<BlogImage 
  src="/images/blog/security-demo.gif" 
  alt="Security Demo"
  caption="Figure 2: Authentication flow demonstration"
/>

More content here...
```

## Markdown Features

MDX supports all standard Markdown syntax:

### Headers
```markdown
# H1 Header
## H2 Header
### H3 Header
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`Inline code`
```

### Lists
```markdown
- Unordered item 1
- Unordered item 2

1. Ordered item 1
2. Ordered item 2
```

### Links
```markdown
[Link text](https://example.com)
```

### Blockquotes
```markdown
> This is a blockquote
```

### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Value 1  | Value 2  |
```

## Draft Mode

Posts with `draft: true` in frontmatter are:
- ✅ **Visible in development** (`pnpm dev`)
- ❌ **Hidden in production** (after deploy)

This allows you to work on posts without publishing them.

```yaml
---
title: "Work in Progress"
slug: "work-in-progress"
# ... other fields ...
draft: true    # Won't appear in production
---
```

## Featured Posts

Posts with `featured: true` appear in a special "Featured Posts" section at the top of the blog listing page:

```yaml
---
title: "Important Announcement"
slug: "important-announcement"
# ... other fields ...
featured: true    # Shows in featured section
---
```

## Sorting

Blog posts are automatically sorted by:
1. **Featured posts first** (if `featured: true`)
2. **By date** (newest first, based on `publishedAt`)

## Testing Your Post

1. **Start dev server**: `pnpm dev`
2. **Visit blog listing**: http://localhost:5173/blogs
3. **Check your post appears** in the list
4. **Click to view**: http://localhost:5173/blogs/your-slug
5. **Verify**:
   - Title and metadata display correctly
   - Images load properly
   - Code blocks render with syntax highlighting
   - Components work as expected
   - Mobile responsive layout looks good

## Build-Time Processing

Blog metadata is parsed at **build time** for optimal performance:

- ✅ Frontmatter validated during build (errors fail the build)
- ✅ Reading time calculated automatically
- ✅ Metadata cached for fast page loads
- ✅ Each post code-split into separate chunks
- ✅ Optimized for Cloudflare Workers deployment

When you run `pnpm build`, you'll see:

```
🔍 Generating blog metadata at build time...
✅ Generated metadata for 2 blog posts
```

## Deployment

After creating or updating a blog post:

```bash
# 1. Test locally
pnpm dev

# 2. Build for production
pnpm build

# 3. Preview the build (optional)
pnpm preview

# 4. Deploy to Cloudflare Workers
pnpm deploy
```

Your post will be live in ~2 minutes!

## Troubleshooting

### Post doesn't appear in listing

**Possible causes:**
- `draft: true` in frontmatter (check production mode)
- Invalid frontmatter (check build output for errors)
- File not saved or not in `src/content/blogs/` directory

**Solution:** Check console for parsing errors during `pnpm dev`

### Images not loading

**Possible causes:**
- Using relative paths instead of absolute paths
- Image not in `/public/images/blog/` directory
- Typo in image filename

**Solution:** Use absolute paths starting with `/images/blog/`

### Code block not rendering

**Possible causes:**
- Incorrect syntax in `<CodeBlock>` component
- Missing backticks in `code` prop

**Solution:** Use template literals with backticks for code content

### "Cannot find module" error

**Possible cause:** Trying to import components in MDX

**Solution:** Remove all import statements - components are pre-registered

### Build fails with validation error

**Possible cause:** Invalid frontmatter (missing required fields, wrong types)

**Solution:** Check the error message and fix the frontmatter schema

## Best Practices

### ✅ DO

- Use absolute paths for all images (`/images/blog/...`)
- Write descriptive alt text for images
- Add captions to figures for context
- Use the `light-bg` variant for diagrams and screenshots with light backgrounds
- Test locally before deploying
- Use semantic HTML through Markdown (headers, lists, etc.)
- Keep slugs lowercase with hyphens
- Write SEO-friendly descriptions (50-300 characters)
- Tag posts appropriately for discoverability

### ❌ DON'T

- Import components in MDX files
- Use relative paths for images
- Store images in `src/assets/` (use `/public/images/blog/`)
- Skip required frontmatter fields
- Use special characters in slugs
- Make descriptions too short or too long
- Forget to test in dev mode before deploying

## Future Enhancements

Once the core system is running smoothly, we plan to iterate on the blog experience in stages:

### Short Term (Next Sprint)
- [ ] Search functionality (client-side with Fuse.js)
- [ ] Tag filtering page (`/blogs/tag/$tag`)
- [ ] Author filtering page (`/blogs/author/$author`)
- [ ] Related posts section (based on tags)
- [ ] Table of contents for long posts
- [ ] Reading progress indicator

### Medium Term (Next Month)
- [ ] Comments system (GitHub Discussions API)
- [ ] Newsletter signup integration
- [ ] Social sharing buttons
- [ ] Series/multi-part post support
- [ ] Code block features (copy button, line numbers)
- [ ] Estimated reading time calculation

### Long Term (Future)
- [ ] Full-text search with MeiliSearch
- [ ] Image optimization pipeline
- [ ] Multiple authors support
- [ ] Draft previews with secret URLs
- [ ] Scheduled publishing (via GitHub Actions)
- [ ] Analytics integration
- [ ] CMS integration (Tina.dev for non-technical editors)

## Examples

See these existing posts for reference:

- `mcp-b-introduction.mdx` - Complex post with multiple components, images, and diagrams
- `getting-started.mdx` - Simpler tutorial-style post

## Need Help?

If you encounter issues:

1. Check this README for guidelines
2. Review example posts in this directory
3. Check the build output for error messages
4. Run `pnpm dev` and check browser console
5. Verify your frontmatter matches the schema exactly

---

**Happy blogging! 🎉**
