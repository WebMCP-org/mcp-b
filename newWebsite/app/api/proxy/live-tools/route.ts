import { NextResponse } from 'next/server';

const DOCS_BASE_URL = 'https://docs.mcp-b.ai';

export async function GET() {
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

    // Rewrite relative URLs to absolute URLs pointing to the docs site
    // This ensures all assets (CSS, JS, fonts, images) load from the original domain
    // Using negative lookahead (?!\/) to only match single forward slashes (relative URLs)
    // and avoid matching protocol-relative URLs (//)
    html = html
      .replace(/src="\/(?!\/)/g, `src="${DOCS_BASE_URL}/`)
      .replace(/href="\/(?!\/)/g, `href="${DOCS_BASE_URL}/`)
      .replace(/url\(\/(?!\/)/g, `url(${DOCS_BASE_URL}/`);

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=600',
        // Remove CSP headers that might interfere
        'Content-Security-Policy': '',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}
