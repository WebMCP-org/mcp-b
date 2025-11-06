// Type declarations for MCP-B Web Model Context API
// https://docs.mcp-b.ai

interface ModelContextTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties?: Record<string, unknown>;
    required?: string[];
    [key: string]: unknown;
  };
  execute: (params: any) => Promise<{
    content: Array<{ type: string; text: string }>;
    [key: string]: unknown;
  }>;
}

interface ModelContext {
  registerTool: (tool: ModelContextTool) => Promise<void>;
  unregister?: () => void;
}

interface Navigator {
  modelContext?: ModelContext;
}

interface Window {
  navigator: Navigator;
}
