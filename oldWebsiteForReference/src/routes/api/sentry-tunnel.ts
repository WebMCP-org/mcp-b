import { createServerFileRoute } from '@tanstack/react-start/server';

function dsnToEnvelopeUrl(dsn: string) {
  const url = new URL(dsn);
  const projectId = url.pathname.replace(/^\//, '');
  return `https://${url.host}/api/${projectId}/envelope/`;
}

export const ServerRoute = createServerFileRoute('/api/sentry-tunnel').methods({
  POST: async ({ request }) => {
    try {
      const dsn = (process as any)?.env?.SENTRY_DSN as string | undefined;
      if (!dsn) return new Response('Missing SENTRY_DSN', { status: 500 });
      const body = await request.arrayBuffer();
      const url = dsnToEnvelopeUrl(dsn);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/x-sentry-envelope' },
        body,
      });
      return new Response(null, { status: res.status });
    } catch (e) {
      return new Response('Tunnel error', { status: 500 });
    }
  },
});

