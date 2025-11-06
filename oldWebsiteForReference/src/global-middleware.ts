import { createMiddleware, registerGlobalMiddleware } from '@tanstack/react-start';
import * as Sentry from '@sentry/tanstackstart-react';

// Register Sentry global server middleware to instrument server function invocations
registerGlobalMiddleware({
  middleware: [createMiddleware().server(Sentry.sentryGlobalServerMiddlewareHandler())],
});

