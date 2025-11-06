# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MCP-B (Browser Model Context Protocol) is an open-source implementation that brings the Model Context Protocol to browsers, enabling web apps to expose tools and context to AI agents.

See docs for reference: [MCP-B Documentation](./mcp-b-docs-for-reference)

### Project Status

**This is a NEW website rebuild based on a template.** The `oldWebsite` directory contains the current production site. This `newWebsite` directory is a clean Next.js template that serves as the starting point for the redesigned MCP-B website.

**Development Approach:**
- Start with this template as the foundation
- Gradually integrate content and branding from the MCP-B project
- This is essentially a from-scratch rebuild using modern Next.js patterns

**Tech Stack:**
- Next.js 15.4.4 (App Router)
- React 19 with TypeScript
- Tailwind CSS v4 (using `@theme` directive in globals.css)
- MDX for blog content
- Motion for animations
- next-themes for dark/light mode
- **Deployment:** Cloudflare Workers via @opennextjs/cloudflare

## Development Commands

### Local Development
```bash
# Development server (standard)
npm run dev

# Development server (with Turbopack - faster)
npm run dev:turbopack

# Lint code
npm run lint
```

### Cloudflare Workers Deployment
This project deploys to **Cloudflare Workers** (not Pages) using OpenNext.

```bash
# Build for Cloudflare Workers (required before preview/deploy)
npm run cf:build

# Preview locally with Wrangler
npm run cf:preview
# or
npm run preview

# Deploy to Cloudflare Workers
npm run cf:deploy
```

**Note:** The `build` script is required by OpenNext (it runs `next build` internally). Only `npm run start` has been removed - use `cf:preview` instead.

**Deployment Configuration:**
- `wrangler.toml` - Cloudflare Workers configuration
- `.dev.vars` - Local development environment variables (not committed)
- Uses Node.js runtime (not Edge runtime) for full Next.js feature support
- Deploys to Workers, NOT Cloudflare Pages

**Note:** No test suite is currently configured.

## Project Architecture

### App Router Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Navbar, Footer, and ThemeProvider
  - `page.tsx` - Homepage
  - Individual route folders: about, blog, careers, contact, playground, pricing, sign-in, sign-up
  - `blog/[slug]/` - Dynamic blog post routes using MDX

### Component Organization
- `components/` - React components organized by feature
  - `common/` - Shared reusable components
  - `ui/` - Base UI primitives (input, label, textarea)
  - Feature-specific folders (agentic-intelligence, how-it-works, etc.)

### Data & Content
- `constants/` - Static data exports (careers, FAQs, founders, logos, pricing, testimonials)
- `data/` - MDX blog post files
- `lib/blogs.ts` - Blog post utilities and metadata loading

### Configuration & Utilities
- `config/index.ts` - Website configuration (name, URL, description)
- `context/theme-provider.tsx` - Dark/light theme context
- `lib/seo.ts` - SEO helper functions for OpenGraph and Twitter cards
- `lib/utils.ts` - Utility functions (cn for className merging)

### Static Assets
- `public/` - All static assets organized by type (avatars, blog, illustrations, logos, team)

## Key Technical Details

### Tailwind CSS v4
This project uses Tailwind CSS v4 with inline configuration via the `@theme` directive in `app/globals.css`. There is NO separate tailwind.config.js file. All theme customization (colors, fonts, animations) is defined in globals.css.

### Path Aliases
Use the `@/` alias for imports from the project root:
```typescript
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config'
```

### MDX Blog Posts
- Blog posts are stored as `.mdx` files in `data/`
- Frontmatter includes: title, summary, date, author, tags
- Posts are loaded and rendered via `lib/blogs.ts` utilities
- Individual posts are rendered at `/blog/[slug]`

### Theming
- Dark/light mode implemented via next-themes
- Theme colors defined using CSS variables in globals.css
- ThemeProvider wraps the app in `app/layout.tsx`

### Environment Variables
- `NEXT_PUBLIC_WEBSITE_URL` - Website URL (defaults to https://mcp-b.ai/)

## Code Style

- TypeScript is used throughout the codebase
- Prettier with Tailwind plugin for formatting (.prettierrc.json)
- Components use functional React patterns with hooks
- Motion library for animations (not Framer Motion)
