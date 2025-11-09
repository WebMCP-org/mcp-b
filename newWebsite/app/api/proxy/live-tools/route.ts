import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const DOCS_BASE_URL = 'https://docs.mcp-b.ai';

async function fetchWithCurl(url: string): Promise<string> {
  try {
    const { stdout, stderr } = await execAsync(
      `curl -s -L -H "User-Agent: Mozilla/5.0 (compatible; MCP-B-Playground/1.0)" "${url}"`,
      { maxBuffer: 10 * 1024 * 1024 } // 10MB buffer
    );

    if (stderr) {
      console.warn('[Proxy] curl stderr:', stderr);
    }

    return stdout;
  } catch (error) {
    console.error('[Proxy] curl error:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    let html = await fetchWithCurl(`${DOCS_BASE_URL}/live-tool-examples`);

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
