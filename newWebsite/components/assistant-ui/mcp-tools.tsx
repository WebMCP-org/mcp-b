'use client';

import { useAssistantTool } from '@assistant-ui/react';
import type { Client } from '@modelcontextprotocol/sdk/client/index.js';
import type { CallToolResult, Tool as MCPTool } from '@modelcontextprotocol/sdk/types.js';
import type { FC } from 'react';

type ToolWithSource = MCPTool & { _sourceId?: string };

/**
 * Bridge component that registers a single MCP tool with assistant-ui
 *
 * Handles tool execution and routing to the appropriate MCP client.
 */
const McpToolBridge: FC<{
  toolName: string;
  toolDescription: string;
  inputSchema: unknown;
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}> = ({ toolName, toolDescription, inputSchema, callTool }) => {
  useAssistantTool({
    toolName,
    description: toolDescription,
    parameters: inputSchema as Record<string, unknown>,
    execute: async (args) => {
      try {
        console.log(`[McpToolBridge] Executing tool: ${toolName}`, args);
        const result: CallToolResult = (await callTool(toolName, args)) as CallToolResult;

        // Extract text content from result
        const content = Array.isArray(result.content) ? result.content : [];
        const resultText = content
          .filter((c: any) => c.type === 'text')
          .map((c: any) => c.text)
          .join('\n');

        console.log(`[McpToolBridge] Tool ${toolName} result:`, resultText);
        return resultText || 'Success';
      } catch (error) {
        console.error('[McpToolBridge] Tool execution failed:', error);
        throw error;
      }
    },
  });

  return null;
};

/**
 * Tool registry component that registers all WebMCP tools with assistant-ui
 *
 * Uses useAssistantTool hook to dynamically register tools from WebMCP iframes.
 */
export const MCPToolRegistry: FC<{
  webMcpTools: MCPTool[];
  webMcpClients: React.RefObject<Map<string, Client>>;
}> = ({ webMcpTools, webMcpClients }) => {
  return (
    <>
      {webMcpTools.map((tool) => {
        const sourceId = (tool as ToolWithSource)._sourceId;
        if (!sourceId) {
          console.warn('[MCPToolRegistry] WebMCP tool missing _sourceId:', tool.name);
          return null;
        }
        return (
          <McpToolBridge
            key={`${sourceId}-${tool.name}`}
            toolName={tool.name}
            toolDescription={tool.description || ''}
            inputSchema={tool.inputSchema}
            callTool={(name, args) => {
              const webMcpClient = webMcpClients.current?.get(sourceId);
              if (!webMcpClient) {
                throw new Error(`WebMCP client not found for source: ${sourceId}`);
              }
              return webMcpClient.callTool({ name, arguments: args });
            }}
          />
        );
      })}
    </>
  );
};
