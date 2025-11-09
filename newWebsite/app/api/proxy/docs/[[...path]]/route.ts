import { NextRequest, NextResponse } from 'next/server';

const DOCS_BASE_URL = 'https://docs.mcp-b.ai';

// Detect runtime environment
const isEdgeRuntime = typeof EdgeRuntime !== 'undefined' || typeof WebSocketPair !== 'undefined';

// Fetch-based implementation for Cloudflare Workers / Edge Runtime
async function fetchWithFetch(url: string): Promise<{ buffer: ArrayBuffer; contentType: string; status: number }> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MCP-B-Playground/1.0)',
      },
      // @ts-ignore - Cloudflare Workers specific option
      cf: {
        cacheTtl: 300,
        cacheEverything: true,
      }
    });

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const buffer = await response.arrayBuffer();

    return {
      buffer,
      contentType,
      status: response.status,
    };
  } catch (error) {
    console.error('[Proxy] fetch error:', error);
    throw error;
  }
}

// Curl-based implementation for Node.js runtime (fallback for local dev with DNS issues)
async function fetchWithCurl(url: string): Promise<{ buffer: ArrayBuffer; contentType: string; status: number }> {
  try {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    const { stdout } = await execAsync(
      `curl -s -i -L -H "User-Agent: Mozilla/5.0 (compatible; MCP-B-Playground/1.0)" "${url}"`,
      { maxBuffer: 10 * 1024 * 1024, encoding: 'buffer' }
    );

    // Parse headers and body - handle redirect chains by finding the LAST set of headers
    const output = stdout.toString('binary');
    const parts = output.split('\r\n\r\n');

    let headers = '';
    let bodyStartIndex = 0;

    for (let i = parts.length - 1; i >= 0; i--) {
      if (parts[i].match(/^HTTP\/[\d.]+\s+\d+/m)) {
        headers = parts[i];
        bodyStartIndex = parts.slice(0, i + 1).join('\r\n\r\n').length + 4;
        break;
      }
    }

    const bodyBuffer = Buffer.from(output.substring(bodyStartIndex), 'binary');

    const statusMatch = headers.match(/HTTP\/[\d.]+\s+(\d+)/);
    const status = statusMatch ? parseInt(statusMatch[1]) : 200;

    const contentTypeMatch = headers.match(/content-type:\s*([^\r\n]+)/i);
    const contentType = contentTypeMatch ? contentTypeMatch[1].trim() : 'application/octet-stream';

    return {
      buffer: bodyBuffer.buffer.slice(bodyBuffer.byteOffset, bodyBuffer.byteOffset + bodyBuffer.byteLength),
      contentType,
      status,
    };
  } catch (error) {
    console.error('[Proxy] curl error:', error);
    throw error;
  }
}

// Universal fetch function that chooses implementation based on runtime
async function universalFetch(url: string): Promise<{ buffer: ArrayBuffer; contentType: string; status: number }> {
  if (isEdgeRuntime) {
    return fetchWithFetch(url);
  } else {
    // Try fetch first, fallback to curl if DNS issues occur
    try {
      return await fetchWithFetch(url);
    } catch (error: any) {
      // Check for DNS errors in error cause chain
      const isDNSError = error?.code === 'EAI_AGAIN' ||
                         error?.code === 'ENOTFOUND' ||
                         error?.cause?.code === 'EAI_AGAIN' ||
                         error?.cause?.code === 'ENOTFOUND';

      if (isDNSError) {
        console.log('[Proxy] DNS error, falling back to curl');
        return await fetchWithCurl(url);
      }
      throw error;
    }
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const pathString = path ? path.join('/') : '';
    const searchParams = request.nextUrl.searchParams.toString();
    const targetUrl = `${DOCS_BASE_URL}/${pathString}${searchParams ? `?${searchParams}` : ''}`;

    console.log('[Docs Proxy] Proxying:', targetUrl);

    const { buffer, contentType, status } = await universalFetch(targetUrl);

    if (status < 200 || status >= 300) {
      return NextResponse.json(
        { error: 'Failed to fetch from docs site' },
        { status }
      );
    }

    // Create response with stripped security headers that prevent iframe embedding
    const headers = new Headers({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=300, s-maxage=600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });

    // Explicitly ensure these headers are NOT set
    // (they prevent iframe embedding)
    headers.delete('X-Frame-Options');
    headers.delete('Content-Security-Policy');
    headers.set('Content-Security-Policy', '');

    // Return ArrayBuffer directly (works in both Node.js and Workers)
    return new NextResponse(buffer, {
      status,
      headers,
    });
  } catch (error) {
    console.error('[Docs Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const pathString = path ? path.join('/') : '';
    const targetUrl = `${DOCS_BASE_URL}/${pathString}`;

    const bodyBuffer = await request.arrayBuffer();
    const requestContentType = request.headers.get('content-type') || 'application/json';

    // Use fetch for POST (works in both environments)
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': requestContentType,
        'User-Agent': 'Mozilla/5.0 (compatible; MCP-B-Playground/1.0)',
      },
      body: bodyBuffer,
    });

    const responseBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'application/json';

    const headers = new Headers({
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
    });

    // Strip iframe-blocking headers
    headers.delete('X-Frame-Options');
    headers.delete('Content-Security-Policy');
    headers.set('Content-Security-Policy', '');

    return new NextResponse(responseBuffer, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error('[Docs Proxy] POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy POST request' },
      { status: 500 }
    );
  }
}
