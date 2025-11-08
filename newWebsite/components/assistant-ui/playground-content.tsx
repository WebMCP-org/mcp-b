'use client';

import { useState, useEffect, useRef } from 'react';
import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChatRuntime, AssistantChatTransport } from '@assistant-ui/react-ai-sdk';
import { IframeParentTransport } from '@mcp-b/transports';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { Cloud, Layout } from 'lucide-react';
import { Thread } from './thread';
import { MCPToolRegistry } from './mcp-tools';
import { MobileViewToggle, type MobileView } from './mobile-view-toggle';
import { useWebMCPIntegration } from '@/hooks/useWebMCPIntegration';
import { UIResourceProvider } from '@/contexts/UIResourceContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { countToolsBySource } from '@/lib/mcp-utils';
import { cn } from '@/lib/utils';
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
  const [mobileView, setMobileView] = useState<MobileView>('iframe');
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

  const toolCounts = countToolsBySource(webMcpIntegration.webMcpTools);

  return (
    <TooltipProvider>
      <UIResourceProvider>
        <AssistantRuntimeProvider runtime={runtime}>
          {/* Register MCP tools as assistant tools */}
          <MCPToolRegistry
            webMcpTools={webMcpIntegration.webMcpTools}
            webMcpClients={webMcpIntegration.webMcpClients}
          />

          <div className="flex flex-col h-full">
            {/* Mobile View Toggle - Only visible on mobile */}
            <div className="md:hidden px-3 py-2 border-b border-divide bg-background">
              <MobileViewToggle view={mobileView} onViewChange={setMobileView} />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 h-full overflow-hidden">
              {/* Iframe Panel */}
              <div
                className={cn(
                  'flex flex-col border-r border-divide',
                  // Mobile: show/hide based on mobileView
                  'w-full md:w-auto md:flex-1',
                  mobileView === 'chat' ? 'hidden md:flex' : 'flex'
                )}
              >
                <WebPreview defaultUrl="/embed">
                  <WebPreviewNavigation>
                    <WebPreviewUrl />
                  </WebPreviewNavigation>
                  <WebPreviewBody ref={iframeRef} title="Landing Page Preview" />
                </WebPreview>
              </div>

              {/* Chat Panel */}
              <div
                className={cn(
                  'flex flex-col bg-background',
                  // Mobile: full width, Desktop: fixed 400px
                  'w-full md:w-[400px]',
                  mobileView === 'iframe' ? 'hidden md:flex' : 'flex'
                )}
              >
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
                    <div className="flex items-center gap-2">
                      {toolCounts.webmcp > 0 && (
                        <div className="flex items-center gap-1 text-xs text-green-700 dark:text-green-300 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                          <Layout className="h-3 w-3" />
                          <span>{toolCounts.webmcp}</span>
                        </div>
                      )}
                      {toolCounts.remote > 0 && (
                        <div className="flex items-center gap-1 text-xs text-blue-700 dark:text-blue-300 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
                          <Cloud className="h-3 w-3" />
                          <span>{toolCounts.remote}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Thread */}
                <div className="flex-1 overflow-hidden">
                  <Thread />
                </div>
              </div>
            </div>
          </div>
        </AssistantRuntimeProvider>
      </UIResourceProvider>
    </TooltipProvider>
  );
}
