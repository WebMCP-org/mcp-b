/// <reference types="vite/client" />
import { StartClient } from '@tanstack/react-start/client';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './globals.css';
import './index.css';
import { createRouter } from './router';
import { server, transport } from './TabServer';
import * as Sentry from '@sentry/tanstackstart-react';

// Initialize MCP server
server.connect(transport);

// Create router instance
const router = createRouter();

// Initialize Sentry in the browser
const browserDsn = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SENTRY_DSN) as
  | string
  | undefined;
Sentry.init({
  dsn: browserDsn,
  enabled: Boolean(browserDsn),
  debug: Boolean((import.meta as any)?.env?.DEV),
  sendDefaultPii: true,
  environment: (import.meta as any)?.env?.MODE || 'development',
  // Route browser traffic through local tunnel in dev only
  tunnel: (import.meta as any)?.env?.DEV ? '/api/sentry-tunnel' : undefined,
  tracesSampleRate: ((import.meta as any)?.env?.DEV ? 1.0 : 0.1) as number,
  integrations: [Sentry.replayIntegration()],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Create or hydrate root depending on SSR markup
const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>
);

// Check if we have SSR content to hydrate, otherwise create new root
if (container.hasChildNodes() && container.innerHTML.trim() !== '') {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
