import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import {
  ErrorComponent,
  NotFoundComponent,
  PendingComponent,
} from '../components/router-components';
import { routeTree } from '../routeTree.gen';

/**
 * Router creation function for TanStack Start
 */
export function createRouter() {
  return createTanStackRouter({
    routeTree,
    // Preload routes on hover/focus for better UX
    defaultPreload: 'intent',
    // Don't cache preloaded data
    defaultPreloadStaleTime: 0,
    // Default error component
    defaultErrorComponent: ErrorComponent,
    // Default pending component
    defaultPendingComponent: PendingComponent,
    // Default 404 component
    defaultNotFoundComponent: NotFoundComponent,
    // Context for all routes
    context: {
      // Add any global context here
    },
  });
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
