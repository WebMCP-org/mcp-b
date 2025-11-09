import { NextRequest, NextResponse } from 'next/server';

const DOCS_BASE_URL = 'https://docs.mcp-b.ai';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${DOCS_BASE_URL}/live-tool-examples`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MCP-B-Playground/1.0)',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch live tools page' },
        { status: response.status }
      );
    }

    let html = await response.text();

    // Get the base URL for the proxy
    const baseUrl = new URL(request.url);
    const proxyBase = `${baseUrl.protocol}//${baseUrl.host}/api/proxy/docs/`;

    // Inject a base tag to make all relative URLs use the proxy
    // Insert right after the opening <head> tag
    html = html.replace(
      /<head>/i,
      `<head><base href="${proxyBase}">`
    );

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=600',
        'Access-Control-Allow-Origin': '*',
        'Content-Security-Policy': '',
      },
    });
  } catch (error) {
    console.error('[Live Tools Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}
