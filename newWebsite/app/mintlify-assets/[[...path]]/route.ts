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
    const targetUrl = `${DOCS_BASE_URL}/mintlify-assets/${pathString}${searchParams ? `?${searchParams}` : ''}`;

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MCP-B-Playground/1.0)',
      },
    });

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    const headers = new Headers({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
    });

    return new NextResponse(buffer, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error('[Mintlify Assets Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy asset request' },
      { status: 500 }
    );
  }
}
