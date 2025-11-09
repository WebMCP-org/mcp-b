'use client';

import '@mcp-b/global';
import { useNavigationTools, useThemeTools } from '@/hooks/useWebMCPTools';

/**
 * WebMCP Provider Component
 *
 * This component registers global WebMCP tools that should be available
 * across all pages. Wrap this around page content to enable AI tools.
 *
 * Usage:
 * ```tsx
 * export default function MyPage() {
 *   return (
 *     <WebMCPProvider>
 *       <YourPageContent />
 *     </WebMCPProvider>
 *   );
 * }
 * ```
 */
export function WebMCPProvider({ children }: { children: React.ReactNode }) {
  // Register global tools
  useNavigationTools();
  useThemeTools();

  return <>{children}</>;
}

/**
 * Example: Contact Page WebMCP Tools
 *
 * This shows how to create page-specific tool wrappers
 */
export function ContactPageTools({ children }: { children: React.ReactNode }) {
  // Import and use contact-specific tools here
  // useContactFormTools();

  return <>{children}</>;
}
