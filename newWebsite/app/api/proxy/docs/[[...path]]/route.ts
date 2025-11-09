import { NextRequest, NextResponse } from 'next/server';

const DOCS_BASE_URL = 'https://docs.mcp-b.ai';

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

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MCP-B-Playground/1.0)',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from docs site' },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type') || '';
    const body = await response.arrayBuffer();

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

    return new NextResponse(body, {
      status: response.status,
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

    const body = await request.arrayBuffer();

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': request.headers.get('content-type') || 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; MCP-B-Playground/1.0)',
      },
      body,
    });

    const contentType = response.headers.get('content-type') || '';
    const responseBody = await response.arrayBuffer();

    const headers = new Headers({
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
    });

    // Strip iframe-blocking headers
    headers.delete('X-Frame-Options');
    headers.delete('Content-Security-Policy');
    headers.set('Content-Security-Policy', '');

    return new NextResponse(responseBody, {
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
