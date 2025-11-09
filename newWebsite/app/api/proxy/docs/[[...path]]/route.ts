import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as http from 'http';
import * as https from 'https';

const execAsync = promisify(exec);
const DOCS_BASE_URL = 'https://docs.mcp-b.ai';

async function fetchWithCurl(url: string): Promise<{ buffer: Buffer; contentType: string; status: number }> {
  try {
    // Use curl with -i to include headers in output
    const { stdout } = await execAsync(
      `curl -s -i -L -H "User-Agent: Mozilla/5.0 (compatible; MCP-B-Playground/1.0)" "${url}"`,
      { maxBuffer: 10 * 1024 * 1024, encoding: 'buffer' }
    );

    // Parse headers and body - handle redirect chains by finding the LAST set of headers
    const output = stdout.toString('binary');

    // Split by header/body separator to find all HTTP responses
    const parts = output.split('\r\n\r\n');

    // Work backwards to find the last HTTP response headers
    let headers = '';
    let bodyStartIndex = 0;

    for (let i = parts.length - 1; i >= 0; i--) {
      // Check if this part contains an HTTP status line
      if (parts[i].match(/^HTTP\/[\d.]+\s+\d+/m)) {
        headers = parts[i];
        // Calculate where the body starts (after all previous parts + their separators)
        bodyStartIndex = parts.slice(0, i + 1).join('\r\n\r\n').length + 4;
        break;
      }
    }

    const body = Buffer.from(output.substring(bodyStartIndex), 'binary');

    // Extract status code from the last HTTP response
    const statusMatch = headers.match(/HTTP\/[\d.]+\s+(\d+)/);
    const status = statusMatch ? parseInt(statusMatch[1]) : 200;

    // Extract content-type from the last set of headers
    const contentTypeMatch = headers.match(/content-type:\s*([^\r\n]+)/i);
    const contentType = contentTypeMatch ? contentTypeMatch[1].trim() : 'application/octet-stream';

    return { buffer: body, contentType, status };
  } catch (error) {
    console.error('[Proxy] curl error:', error);
    throw error;
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

    const { buffer, contentType, status } = await fetchWithCurl(targetUrl);

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

    // Convert Buffer to Uint8Array for NextResponse compatibility
    return new NextResponse(new Uint8Array(buffer), {
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

async function postWithNode(url: string, body: Buffer, contentType: string): Promise<{ buffer: Buffer; contentType: string; status: number }> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = url.startsWith('https') ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        'Content-Length': body.length,
        'User-Agent': 'Mozilla/5.0 (compatible; MCP-B-Playground/1.0)',
      },
    };

    const req = client.request(options, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      res.on('end', () => {
        resolve({
          buffer: Buffer.concat(chunks),
          contentType: res.headers['content-type'] || 'application/json',
          status: res.statusCode || 500,
        });
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const pathString = path ? path.join('/') : '';
    const targetUrl = `${DOCS_BASE_URL}/${pathString}`;

    const body = Buffer.from(await request.arrayBuffer());
    const requestContentType = request.headers.get('content-type') || 'application/json';

    const { buffer, contentType, status } = await postWithNode(targetUrl, body, requestContentType);

    const headers = new Headers({
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
    });

    // Strip iframe-blocking headers
    headers.delete('X-Frame-Options');
    headers.delete('Content-Security-Policy');
    headers.set('Content-Security-Policy', '');

    // Convert Buffer to Uint8Array for NextResponse compatibility
    return new NextResponse(new Uint8Array(buffer), {
      status,
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
