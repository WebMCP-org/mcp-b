import type { Client } from '@modelcontextprotocol/sdk/client/index.js';
import type {
  CallToolRequest,
  CallToolResult,
  Tool as MCPTool,
} from '@modelcontextprotocol/sdk/types.js';
import { useCallback, useEffect, useRef, useState } from 'react';

type ToolWithSource = MCPTool & { _sourceId: string };

/**
 * Manage WebMCP iframe clients and dynamic tool registration
 *
 * Handles registration of WebMCP clients from iframes, manages their tools,
 * and routes tool calls to the appropriate client based on source ID.
 */
export function useWebMCPIntegration() {
  const [webMcpTools, setWebMcpTools] = useState<MCPTool[]>([]);
  const webMcpClients = useRef<Map<string, Client>>(new Map());

  const registerWebMcpClient = useCallback((sourceId: string, webMcpClient: Client) => {
    console.log('[useWebMCPIntegration] Registering client:', sourceId);
    webMcpClients.current.set(sourceId, webMcpClient);
  }, []);

  const registerWebMcpTools = useCallback((tools: MCPTool[], sourceId: string) => {
    console.log('[useWebMCPIntegration] Registering tools for:', sourceId, tools);
    setWebMcpTools((prev) => {
      // Remove existing tools from this source
      const filtered = prev.filter((t) => (t as ToolWithSource)._sourceId !== sourceId);
      // Tag new tools with sourceId
      const tagged = tools.map((t) => ({ ...t, _sourceId: sourceId }) as ToolWithSource);
      return [...filtered, ...tagged];
    });
  }, []);

  const unregisterWebMcpClient = useCallback((sourceId: string) => {
    console.log('[useWebMCPIntegration] Unregistering client:', sourceId);
    const webMcpClient = webMcpClients.current.get(sourceId);
    if (webMcpClient) {
      webMcpClient.close?.();
      webMcpClients.current.delete(sourceId);
    }
    setWebMcpTools((prev) => prev.filter((t) => (t as ToolWithSource)._sourceId !== sourceId));
  }, []);

  const callTool = useCallback(
    async (request: CallToolRequest['params'], sourceId?: string): Promise<CallToolResult> => {
      if (!sourceId) {
        throw new Error('Source ID is required for WebMCP tool calls');
      }

      const webMcpClient = webMcpClients.current.get(sourceId);
      if (!webMcpClient) {
        throw new Error(`WebMCP client not found for source: ${sourceId}`);
      }
      try {
        const result = await webMcpClient.callTool(request);
        return result as CallToolResult;
      } catch (error) {
        console.error(`[useWebMCPIntegration] Tool call failed for ${sourceId}:`, error);
        throw error;
      }
    },
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    const clients = webMcpClients;
    return () => {
      clients.current.forEach((client) => {
        client.close().catch(console.error);
      });
      clients.current.clear();
    };
  }, []);

  return {
    webMcpTools,
    webMcpClients,
    registerWebMcpClient,
    registerWebMcpTools,
    unregisterWebMcpClient,
    callTool,
  };
}
