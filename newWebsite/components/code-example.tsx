"use client";
import React, { useEffect, useState } from "react";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";
import { CodeBlock } from "@/components/ui/code-block";
import { motion } from "motion/react";
import { DevopsIcon, GraphIcon } from "@/icons/card-icons";


export const CodeExample = () => {
  const [isToolRegistered, setIsToolRegistered] = useState(false);
  const [toolCallCount, setToolCallCount] = useState(0);

  // Register live tool that actually works
  useEffect(() => {
    if (typeof window === "undefined") return;

    const registerTool = async () => {
      if (!window.navigator?.modelContext?.registerTool) {
        return;
      }

      try {
        await window.navigator.modelContext.registerTool({
          name: "getPageInfo",
          description: "Gets information about the current page",
          inputSchema: {
            type: "object",
            properties: {
              infoType: {
                type: "string",
                enum: ["title", "url", "headings"],
                description: "Type of information to retrieve",
              },
            },
            required: ["infoType"],
          },
          async execute({ infoType }: { infoType: string }) {
            setToolCallCount((prev) => prev + 1);

            let result = "";
            if (infoType === "title") {
              result = document.title;
            } else if (infoType === "url") {
              result = window.location.href;
            } else if (infoType === "headings") {
              const headings = Array.from(
                document.querySelectorAll("h1, h2, h3")
              )
                .slice(0, 5)
                .map((h) => h.textContent || "")
                .join(", ");
              result = headings;
            }

            return {
              content: [{ type: "text", text: result }],
            };
          },
        });

        setIsToolRegistered(true);
      } catch (error) {
        console.error("Failed to register tool:", error);
      }
    };

    registerTool();
  }, []);

  const esmPolyfill = `import '@mcp-b/global';

// Now navigator.modelContext is available
await navigator.modelContext.registerTool({...});`;

  const iifePolyfill = `<script src="https://unpkg.com/@mcp-b/global@latest/dist/index.iife.js"></script>

<script>
  // navigator.modelContext is now available
  navigator.modelContext.registerTool({...});
</script>`;

  const vanillaCode = `navigator.modelContext.registerTool({
  name: "getPageInfo",
  description: "Gets information about the current page",
  inputSchema: {
    type: "object",
    properties: {
      infoType: {
        type: "string",
        enum: ["title", "url", "headings"]
      }
    },
    required: ["infoType"]
  },
  async execute({ infoType }) {
    if (infoType === "title") {
      return { content: [{ type: "text", text: document.title }] };
    }
    // ... other cases
  }
});`;

  const reactCode = `import { useWebMCP } from '@mcp-b/react-webmcp';
import { z } from 'zod';

function MyComponent() {
  const tool = useWebMCP({
    name: "getPageInfo",
    description: "Gets information about the current page",
    inputSchema: {
      infoType: z.enum(["title", "url", "headings"])
    },
    handler: async ({ infoType }) => {
      if (infoType === "title") {
        return { text: document.title };
      } else if (infoType === "url") {
        return { text: window.location.href };
      } else {
        const headings = Array.from(
          document.querySelectorAll("h1, h2, h3")
        ).map(h => h.textContent).join(", ");
        return { text: headings };
      }
    }
  });

  return (
    <div>
      {tool.state.isExecuting && (
        <div className="text-sm text-gray-600">Loading...</div>
      )}
      {tool.state.error && (
        <div className="text-sm text-red-600">
          Error: {tool.state.error.message}
        </div>
      )}
      <div>My AI-Ready App</div>
    </div>
  );
}`;

  return (
    <Container className="border-divide border-x py-20">
      <div className="flex flex-col items-center px-4 md:px-8">
        <Badge text="MCP-B Quick Start" />
        <SectionHeading className="mt-4">
          Expose MCP tools straight from the browser
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-2xl text-center">
          Drop in{" "}
          <code className="bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-white">
            @mcp-b/global
          </code>
          , register typed tools, and let the MCP-B extension advertise them to
          every MCP-compatible assistant—no new servers or auth flows.
        </SubHeading>

        {/* Horizontal Code Blocks */}
        <div className="mt-12 w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Polyfill webMCP */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-charcoal-900 dark:text-white">
                  Polyfill webMCP
                </h3>
              </div>
              <CodeBlock
                language="html"
                filename="Add MCP-B to your app"
                tabs={[
                  {
                    name: "IIFE",
                    code: iifePolyfill,
                    language: "html",
                    highlightLines: [3],
                  },
                  {
                    name: "ESM",
                    code: esmPolyfill,
                    language: "typescript",
                    highlightLines: [1],
                  },
                ]}
              />
            </motion.div>

            {/* Declare Your Tools */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-charcoal-900 dark:text-white">
                  Declare Your Tools
                </h3>
                {isToolRegistered && (
                  <span className="inline-flex items-center gap-1.5 border border-green-800 bg-green-950 px-2 py-0.5 text-xs font-medium text-green-400">
                    <span className="h-1.5 w-1.5 animate-pulse bg-green-500"></span>
                    LIVE
                    {toolCallCount > 0 && ` • ${toolCallCount}`}
                  </span>
                )}
              </div>
              <CodeBlock
                language="javascript"
                filename="Register your first tool"
                tabs={[
                  {
                    name: "Vanilla",
                    code: vanillaCode,
                    language: "javascript",
                    highlightLines: [1, 7],
                  },
                  {
                    name: "React",
                    code: reactCode,
                    language: "typescript",
                    highlightLines: [1, 3],
                  },
                ]}
              />
            </motion.div>
          </div>
        </div>

        {/* Info cards */}
        <motion.div
          className="mt-12 w-full max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white/60 backdrop-blur-sm p-4 transition duration-200 hover:bg-transparent md:p-5 dark:border-white/10 dark:bg-zinc-950/40">
              <div className="flex items-center gap-2">
                <DevopsIcon className="text-brand size-6" />
              </div>
              <h4 className="mt-4 mb-2 text-lg font-medium">
                Framework Agnostic
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Vanilla JS, React, server-rendered apps—if it runs in a tab, it can expose MCP tools to any assistant.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white/60 backdrop-blur-sm p-4 transition duration-200 hover:bg-transparent md:p-5 dark:border-white/10 dark:bg-zinc-950/40">
              <div className="flex items-center gap-2">
                <GraphIcon className="text-brand size-6" />
              </div>
              <h4 className="mt-4 mb-2 text-lg font-medium">
                Assistant-ready schemas
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Define inputs with JSON Schema or zod so LLMs know exactly how to call your tool—no prompt engineering required.
              </p>
            </div>
          </div>

          {/* Try it callout */}
          {isToolRegistered && (
            <div className="mt-6 border border-blue-900 bg-blue-950/50 p-4">
              <p className="text-sm text-blue-100">
                <strong className="text-white">Try it now:</strong> This tool is
                live on this page. Open any MCP-capable assistant (Claude
                Desktop, Cursor, Continue, etc.) and say:{" "}
                <code className="bg-blue-950 px-1.5 py-0.5 font-mono text-xs text-blue-200">
                  &quot;Use the getPageInfo tool to get the page title&quot;
                </code>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </Container>
  );
};
