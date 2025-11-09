# Code Block Integration Guide

This document explains how code blocks are used throughout the MCP-B website.

## Component Architecture

The website uses **three different code block implementations**, each optimized for specific use cases:

### 1. AI Code Block (`components/ai/code-block.tsx`)

**Purpose**: Syntax-highlighted code blocks for AI assistant responses

**Where it's used**:
- AI Assistant chat interface (`components/assistant-ui/markdown-text.tsx`)
- AI-generated code responses
- Demo page (`/code-block-demo`)

**Key features**:
- Prism syntax highlighting
- Copy button with visual feedback
- Automatic dark/light theme switching
- Optional line numbers (auto-enabled for 10+ lines in AI responses)
- Language indicator badge
- Clean, modern shadcn/ui styling

**Usage**:
```tsx
import { CodeBlock, CodeBlockCopyButton } from "@/components/ai/code-block";

<CodeBlock code={codeString} language="typescript" showLineNumbers>
  <CodeBlockCopyButton />
</CodeBlock>
```

### 2. General Code Block (`components/code-block.tsx`)

**Purpose**: Code blocks for blog posts and MDX content

**Where it's used**:
- Blog posts (`/blog/[slug]`)
- MDX content rendering (`lib/blogs.ts`)
- Documentation pages

**Key features**:
- Glass morphism styling (matches site aesthetic)
- Decorative dots in header
- Filename display
- Custom copy button with icons
- Hydration-safe theme switching
- Extracts code from MDX children nodes

**Configuration** (`lib/blogs.ts:32`):
```tsx
const mdxComponents = {
  pre: ({ children }) => <>{children}</>,  // Remove wrapper
  code: (props) => {
    // Inline code
    if (!props.className) return <InlineCode>{props.children}</InlineCode>;

    // Code block
    return <CodeBlock className={props.className} {...props} />;
  },
};
```

### 3. Landing Page Code Examples (`components/code-example.tsx`)

**Purpose**: Interactive code demonstrations with live tools

**Where it's used**:
- Homepage (`app/page.tsx`)
- CodeExample section on landing page

**Key features**:
- Tab switching (IIFE/ESM, Vanilla/React)
- Live tool registration indicator
- Custom dark theme styling
- Decorative terminal-style dots
- Tool call counter
- Framework-specific examples

**Why it's separate**:
This component has unique interactive features that don't fit the standard code block pattern:
- Dynamic content switching between tabs
- Real-time "LIVE" status indicator when tools register
- Custom styling matching the landing page design
- Special header with tool execution count

## Integration Points

### AI Assistant Responses

File: `components/assistant-ui/markdown-text.tsx:31`

```tsx
const CodeHeader: FC<CodeHeaderProps> = ({ language, code }) => {
  if (!language || !code) return null;

  return (
    <AICodeBlock
      code={code}
      language={language}
      showLineNumbers={code.split('\n').length > 10}
    >
      <CodeBlockCopyButton />
    </AICodeBlock>
  );
};
```

The `CodeHeader` component now renders the full AI Code Block instead of just a header. The `pre` component returns `null` for code blocks since they're fully handled by `CodeHeader`.

### Blog Posts

File: `lib/blogs.ts:32`

MDX components are configured to use the general CodeBlock for syntax highlighting while preserving the glass morphism design.

### Landing Page

File: `components/code-example.tsx`

Custom implementation with interactive features. **Does not use** the shared code block components.

## When to Use Which Component

| Use Case | Component | Reason |
|----------|-----------|--------|
| AI chat responses | `ai/code-block.tsx` | Clean, modern, optimized for AI output |
| Blog posts | `code-block.tsx` | Glass morphism matches site design |
| Documentation | `code-block.tsx` | Consistent with blog styling |
| Landing page demos | `code-example.tsx` | Interactive features, custom styling |
| New AI features | `ai/code-block.tsx` | Designed for AI-generated content |

## Styling Philosophy

- **AI Code Block**: Minimalist, professional, theme-aware
- **General Code Block**: Artistic with glass morphism and backdrop blur
- **Landing Page**: Bold, dark, terminal-inspired with interactive elements

## Future Considerations

If you need code highlighting in a new context:

1. **For AI-generated content**: Use `ai/code-block.tsx`
2. **For static content (blogs, docs)**: Use `code-block.tsx`
3. **For custom interactive demos**: Create a new component or extend `code-example.tsx`

## Dependencies

All implementations use:
- `react-syntax-highlighter` for syntax highlighting
- Prism themes (`oneDark`, `oneLight`)
- `next-themes` for dark/light mode detection

## Testing

To test code blocks:

1. **AI responses**: Visit `/playground` and ask for code generation
2. **Blogs**: Visit any blog post with code snippets at `/blog/[slug]`
3. **Landing page**: View the homepage code examples at `/`
4. **Demos**: Visit `/code-block-demo` for AI code block examples
