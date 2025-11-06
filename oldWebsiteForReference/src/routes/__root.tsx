/// <reference types="vite/client" />

import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import * as Sentry from '@sentry/tanstackstart-react';
import { McpToolsProvider } from '@/hooks/McpToolsProvider';
import { ThemeProvider } from '@/ThemeProvider';
import { Toaster } from '../components/ui/sonner';
import '../globals.css';
import '../index.css';
import { queryClient } from '../lib/utils';

// Wrap createRootRoute to enable SSR tracing
export const Route = Sentry.wrapCreateRootRouteWithSentry(createRootRoute)({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'MCP Web | Model Context Protocol for the Browser',
      },
      {
        name: 'description',
        content:
          'MCP-B brings the Model Context Protocol to the browser, enabling web applications to safely expose tools and context to AI agents with zero configuration.',
      },
    ],
    links: [
      // Favicon and logo links
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        href: '/images/logos/logo-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        rel: 'icon',
        href: '/images/logos/logo-16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/images/logos/logo-192.png',
        sizes: '192x192',
      },
      // Resource hints for better performance
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    ],
  }),
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="theme"
        >
          <QueryClientProvider client={queryClient}>
            <McpToolsProvider cache={false}>
              {/* Global subtle background gradient overlay */}
              <div
                aria-hidden
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                  background:
                    'radial-gradient(1200px 800px at 15% 0%, hsl(var(--color-primary)/0.10), transparent 60%), radial-gradient(900px 600px at 85% 100%, hsl(var(--color-primary)/0.08), transparent 60%), radial-gradient(800px 500px at 50% 50%, hsl(var(--color-primary)/0.04), transparent 70%)',
                  filter: 'saturate(110%)',
                }}
              />
              <div className="relative z-10 w-full min-h-screen">
                {children}
                <Toaster />
              </div>
              {/* {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />} */}
            </McpToolsProvider>
          </QueryClientProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootErrorComponent({ error }: { error: Error }) {
  useEffect(() => {
    // Capture errors handled by the route error boundary
    Sentry.captureException(error);
  }, [error]);
  return (
    <RootDocument>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border bg-destructive/10 p-6">
          <h2 className="mb-2 text-2xl font-semibold text-destructive">Application Error</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {error.message || 'An unexpected error occurred'}
          </p>
          <details className="mb-4">
            <summary className="cursor-pointer text-sm font-medium">Error Details</summary>
            <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs">{error.stack}</pre>
          </details>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Reload Application
          </button>
        </div>
      </div>
    </RootDocument>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-6 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
