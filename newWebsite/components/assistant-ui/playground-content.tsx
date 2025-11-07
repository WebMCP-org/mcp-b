'use client';

import { useState, useEffect, useRef } from 'react';
import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChatRuntime, AssistantChatTransport } from '@assistant-ui/react-ai-sdk';
import { IframeParentTransport } from '@mcp-b/transports';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { Thread } from './thread';
import { MCPToolRegistry } from './mcp-tools';
import { useWebMCPIntegration } from '@/hooks/useWebMCPIntegration';
import {
  WebPreview,
  WebPreviewNavigation,
  WebPreviewUrl,
  WebPreviewBody,
} from '@/components/ai/web-preview';

const PRODUCTION_API_URL = 'https://mcp-ui.mcp-b.ai/api/chat';
const IFRAME_SOURCE_ID = 'embed-iframe';

export function PlaygroundContent() {
  const [isConnected, setIsConnected] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const transportRef = useRef<IframeParentTransport | null>(null);

  const webMcpIntegration = useWebMCPIntegration();

  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: PRODUCTION_API_URL,
      credentials: 'include',
      fetch: async (url, options) => {
        return fetch(url, {
          ...options,
          headers: {
            ...options?.headers,
            'X-Playground-Source': 'mcp-b-playground',
          },
        });
      },
    }),
  });

  useEffect(() => {
    const setupMCP = async () => {
      if (!iframeRef.current) return;

      try {
        console.log('[Playground] Setting up MCP...');

        // Create transport for iframe communication
        const transport = new IframeParentTransport({
          iframe: iframeRef.current,
          targetOrigin: '*'
        });
        transportRef.current = transport;

        // Create MCP client
        const client = new Client(
          {
            name: 'playground-assistant',
            version: '1.0.0',
          },
          {
            capabilities: {
              tools: {},
            },
          }
        );

        // Connect the client to the transport
        await client.connect(transport);

        // Register the WebMCP client
        webMcpIntegration.registerWebMcpClient(IFRAME_SOURCE_ID, client);

        // List available tools
        const toolsList = await client.listTools();
        console.log('[Playground] Connected! Tools:', toolsList.tools);

        // Register tools with sourceId
        webMcpIntegration.registerWebMcpTools(toolsList.tools, IFRAME_SOURCE_ID);

        setIsConnected(true);
      } catch (error) {
        console.error('[Playground] Failed to setup MCP:', error);
      }
    };

    // Wait for iframe to be ready
    const handleIframeReady = (e: MessageEvent) => {
      if (e.data?.type === 'iframe_ready' && e.source === iframeRef.current?.contentWindow) {
        console.log('[Playground] Iframe is ready, setting up MCP...');
        // Send parent_ready message
        iframeRef.current?.contentWindow?.postMessage({ type: 'parent_ready' }, '*');
        // Small delay to ensure iframe has processed the ready message
        setTimeout(() => setupMCP(), 100);
      }
    };

    window.addEventListener('message', handleIframeReady);
    return () => {
      window.removeEventListener('message', handleIframeReady);
      webMcpIntegration.unregisterWebMcpClient(IFRAME_SOURCE_ID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {/* Register MCP tools as assistant tools */}
      <MCPToolRegistry
        webMcpTools={webMcpIntegration.webMcpTools}
        webMcpClients={webMcpIntegration.webMcpClients}
      />

      <div className="flex h-full gap-0">
        {/* Iframe Panel - Left Side */}
        <div className="flex-1 flex flex-col border-r border-divide">
          <WebPreview defaultUrl="/embed">
            <WebPreviewNavigation>
              <WebPreviewUrl />
            </WebPreviewNavigation>
            <WebPreviewBody
              ref={iframeRef}
              title="Landing Page Preview"
            />
          </WebPreview>
        </div>

        {/* Chat Panel - Right Side */}
        <div className="w-[400px] flex flex-col bg-background">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-divide bg-gray-50 dark:bg-neutral-800">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-sm font-medium text-charcoal-700 dark:text-neutral-100">
                {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
            {isConnected && (
              <span className="text-xs text-gray-600 dark:text-neutral-400">
                {webMcpIntegration.webMcpTools.length} tools
              </span>
            )}
          </div>

          {/* Thread */}
          <div className="flex-1 overflow-hidden">
            <Thread />
          </div>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}
