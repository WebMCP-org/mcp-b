'use client';

import { initializeWebModelContext } from '@mcp-b/global';
import { useEffect, useState } from 'react';
import '@/app/globals.css';

// Initialize WebMCP before rendering
if (typeof window !== 'undefined') {
  initializeWebModelContext({
    transport: { tabServer: { allowedOrigins: ['*'] } }
  });
}

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
