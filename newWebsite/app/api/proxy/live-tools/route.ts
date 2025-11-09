import { NextRequest, NextResponse } from 'next/server';

const DOCS_BASE_URL = 'https://docs.mcp-b.ai';

// Detect runtime environment
const isEdgeRuntime = typeof EdgeRuntime !== 'undefined' || typeof WebSocketPair !== 'undefined';

async function fetchHTML(url: string): Promise<string> {
  // For Cloudflare Workers / Edge Runtime, always use fetch
  if (isEdgeRuntime) {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MCP-B-Playground/1.0)',
      },
      // @ts-ignore - Cloudflare Workers specific
      cf: {
        cacheTtl: 300,
        cacheEverything: true,
      }
    });
    return await response.text();
  }

  // For Node.js, try fetch first, fallback to curl if DNS issues
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MCP-B-Playground/1.0)',
      },
    });
    return await response.text();
  } catch (error: any) {
    // Check for DNS errors in error cause chain
    const isDNSError = error?.code === 'EAI_AGAIN' ||
                       error?.code === 'ENOTFOUND' ||
                       error?.cause?.code === 'EAI_AGAIN' ||
                       error?.cause?.code === 'ENOTFOUND';

    if (isDNSError) {
      console.log('[Live Tools Proxy] DNS error, falling back to curl');
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);

      const { stdout } = await execAsync(
        `curl -s -L -H "User-Agent: Mozilla/5.0 (compatible; MCP-B-Playground/1.0)" "${url}"`,
        { maxBuffer: 10 * 1024 * 1024 }
      );
      return stdout;
    }
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    let html = await fetchHTML(`${DOCS_BASE_URL}/live-tool-examples`);

    // Get the base URL for the proxy
    const baseUrl = new URL(request.url);
    const proxyBase = `${baseUrl.protocol}//${baseUrl.host}/api/proxy/docs/`;

    // Inject a base tag to make all relative URLs use the proxy
    // Insert right after the opening <head> tag
    html = html.replace(
      /<head>/i,
      `<head><base href="${proxyBase}">`
    );

    const headers = new Headers({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=600',
      'Access-Control-Allow-Origin': '*',
    });

    // Strip headers that prevent iframe embedding
    headers.delete('X-Frame-Options');
    headers.delete('Content-Security-Policy');
    headers.set('Content-Security-Policy', '');

    return new NextResponse(html, {
      headers,
    });
  } catch (error) {
    console.error('[Live Tools Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}
