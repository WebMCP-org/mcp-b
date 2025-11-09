# WebMCP Tools Implementation Guide

This guide explains how WebMCP tools are implemented on this website and how to add more.

## Overview

WebMCP enables AI agents to interact with your website through structured tools. This site uses the `@mcp-b/react-webmcp` package with React hooks for easy tool registration.

## Current Implementation

### 1. Embed Page Tools ([app/embed/page.tsx](newWebsite/app/embed/page.tsx))

The embed page has **10 tools**:

**Navigation & View Control:**
- `scroll_to_section` - Scroll to specific page sections
- `scroll_to_top` - Scroll to page top (via reusable hook)
- `scroll_to_bottom` - Scroll to page bottom (via reusable hook)

**Visual Interaction:**
- `highlight_hero` - Highlight the hero section
- `show_message` - Display custom message overlays

**Content Querying:**
- `get_page_state` - Get current page state
- `get_section_content` - Extract text from specific sections
- `search_page` - Search for text across the page
- `get_faq_answer` - Query FAQ content
- `list_sections` - List all available sections
- `get_page_info` - Get detailed page metadata
- `get_scroll_info` - Get scroll position and dimensions (via reusable hook)

**Preferences & Theme:**
- `set_theme` - Change theme (light/dark/system)
- `get_theme` - Get current theme
- `set_preference` - Save user preferences
- `get_preference` - Retrieve preferences
- `list_preferences` - List all stored preferences

### 2. Reusable Tool Hooks ([hooks/useWebMCPTools.tsx](newWebsite/hooks/useWebMCPTools.tsx))

Organized into categories:

- **Theme Tools** (`useThemeTools`) - Dark/light mode control
- **Navigation Tools** (`useNavigationTools`) - Page navigation
- **Form Tools** (`useContactFormTools`) - Form filling and inspection
- **Scroll Tools** (`useScrollTools`) - Scroll control and viewport info
- **Analytics Tools** (`useAnalyticsTools`) - Event tracking
- **Storage Tools** (`useStorageTools`) - Local storage management

## Adding Tools to a Page

### Method 1: Use Reusable Hooks

Import and call the hooks in your client component:

```tsx
'use client';

import { useThemeTools, useNavigationTools } from '@/hooks/useWebMCPTools';

export default function MyPage() {
  // Register tools
  useThemeTools();
  useNavigationTools();

  return <div>Page content</div>;
}
```

### Method 2: Create Custom Tools

Use the `useWebMCP` hook directly:

```tsx
'use client';

import { useWebMCP } from '@mcp-b/react-webmcp';
import { z } from 'zod';

export default function ProductPage() {
  useWebMCP({
    name: 'add_to_cart',
    description: 'Add item to shopping cart',
    inputSchema: {
      productId: z.string(),
      quantity: z.number().min(1),
    },
    handler: async ({ productId, quantity }) => {
      // Your logic here
      await addToCart(productId, quantity);
      return { success: true, quantity };
    },
  });

  return <div>Product page</div>;
}
```

### Method 3: Use Provider Components

For server components, wrap content with client component providers:

```tsx
// app/contact/page.tsx (Server Component)
import { ContactPageTools } from '@/components/webmcp-provider';

export default function ContactPage() {
  return (
    <ContactPageTools>
      <Contact />
    </ContactPageTools>
  );
}
```

## Tool Design Best Practices

1. **Clear Names**: Use descriptive, action-oriented names (e.g., `scroll_to_section`, not `scroll`)
2. **Good Descriptions**: Help AI understand when to use the tool
3. **Schema Validation**: Use Zod schemas for input validation
4. **Error Handling**: Return helpful error messages
5. **Return Values**: Provide structured, informative responses

### Example: Well-Designed Tool

```tsx
useWebMCP({
  name: 'search_products',
  description: 'Search for products by name, category, or tag',
  inputSchema: {
    query: z.string().min(1).describe('Search query'),
    category: z.enum(['all', 'electronics', 'clothing']).optional(),
    maxResults: z.number().min(1).max(50).default(10),
  },
  handler: async ({ query, category = 'all', maxResults = 10 }) => {
    try {
      const results = await searchProducts(query, category, maxResults);
      return {
        query,
        category,
        resultsCount: results.length,
        products: results,
      };
    } catch (error) {
      return {
        error: 'Search failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
});
```

## Testing Your Tools

1. **Start Dev Server**: `npm run dev`
2. **Visit Test Page**: Navigate to `/embed` or another page with tools registered
3. **Test Tools**: Use the [live demo](https://mcp-ui.mcp-b.ai) to interact with your tools
4. **Inspect**: Check browser console for tool registration logs

## Package Configuration

### Required Packages (already installed)

```json
{
  "@mcp-b/react-webmcp": "^0.1.3",
  "@mcp-b/global": "^1.1.0",
  "zod": "^4.1.12"
}
```

### Layout Setup

The embed page layout initializes WebMCP:

```tsx
// app/embed/layout.tsx
import { initializeWebModelContext } from '@mcp-b/global';

if (typeof window !== 'undefined') {
  initializeWebModelContext({
    transport: { tabServer: { allowedOrigins: ['*'] } }
  });
}
```

## Common Tool Patterns

### 1. DOM Query Tools
```tsx
useWebMCP({
  name: 'get_element_text',
  description: 'Get text content from an element by ID',
  inputSchema: { elementId: z.string() },
  handler: async ({ elementId }) => {
    const element = document.getElementById(elementId);
    return element ? element.innerText : 'Element not found';
  },
});
```

### 2. State Management Tools
```tsx
const [state, setState] = useState('initial');

useWebMCP({
  name: 'update_state',
  description: 'Update component state',
  inputSchema: { newState: z.string() },
  handler: async ({ newState }) => {
    setState(newState);
    return `State updated to: ${newState}`;
  },
});
```

### 3. API Integration Tools
```tsx
useWebMCP({
  name: 'fetch_user_data',
  description: 'Fetch user profile data',
  inputSchema: { userId: z.string() },
  handler: async ({ userId }) => {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  },
});
```

## Security Considerations

1. **Validate Inputs**: Always use Zod schemas for validation
2. **Authenticate Actions**: Check user permissions before sensitive operations
3. **Sanitize Data**: Clean user inputs to prevent XSS
4. **Rate Limiting**: Consider rate limits for expensive operations
5. **Origin Validation**: Configure allowed origins in transport setup

## Further Reading

- [WebMCP Documentation](https://docs.mcp-b.ai/)
- [Quick Start Guide](https://docs.mcp-b.ai/quickstart.md)
- [@mcp-b/react-webmcp Package](https://docs.mcp-b.ai/packages/react-webmcp.md)
- [Best Practices](https://docs.mcp-b.ai/best-practices.md)
- [Security Guide](https://docs.mcp-b.ai/security.md)

## Example Use Cases

### E-commerce
- Add to cart
- Update quantities
- Apply coupon codes
- Navigate product categories

### Documentation Sites
- Search documentation
- Navigate sections
- Copy code snippets
- Toggle code examples

### Admin Dashboards
- Filter data tables
- Export reports
- Update settings
- Trigger actions

### Content Sites
- Search articles
- Filter by tags
- Share content
- Adjust reading preferences
