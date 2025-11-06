import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server';
import { createRouter } from './router';
import * as Sentry from '@sentry/tanstackstart-react';
import './global-middleware';

declare global {
  // eslint-disable-next-line no-var
  var __MCPB_ENV__: Record<string, string> | undefined;
}

// Initialize Sentry on the server
const serverDsn = (typeof process !== 'undefined' && (process as any).env?.SENTRY_DSN) as
  | string
  | undefined;
Sentry.init({
  dsn: serverDsn,
  enabled: Boolean(serverDsn),
  debug: (typeof process !== 'undefined' && (process as any).env?.NODE_ENV !== 'production') || false,
  sendDefaultPii: true,
  environment: (typeof process !== 'undefined' && (process as any).env?.NODE_ENV) || 'development',
  tracesSampleRate:
    (typeof process !== 'undefined' && (process as any).env?.NODE_ENV !== 'production') ? 1.0 : 0.1,
});

export default createStartHandler({
  createRouter,
})(
  Sentry.wrapStreamHandlerWithSentry(async (event) => {
    try {
      const env =
        // Cloudflare Workers bindings exposed by TanStack/Nitro
        (event as any)?.context?.cloudflare?.env ||
        (event as any)?.context?.platform?.env ||
        (event as any)?.env ||
        {};
      if (!globalThis.__MCPB_ENV__) {
        globalThis.__MCPB_ENV__ = env;
      }
    } catch {}
    return defaultStreamHandler(event);
  })
);
