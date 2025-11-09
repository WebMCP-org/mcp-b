"use client";
import React, { useEffect, useState } from "react";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";
import { CodeBlock as AICodeBlock, CodeBlockCopyButton } from "@/components/ai/code-block";
import { motion } from "motion/react";


export const CodeExample = () => {
  const [polyfillTab, setPolyfillTab] = useState<"esm" | "iife">("iife");
  const [codeTab, setCodeTab] = useState<"vanilla" | "react">("vanilla");
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
        <Badge text="Quick Start" />
        <SectionHeading className="mt-4">
          Add AI Capabilities in Minutes
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-2xl text-center">
          Include the polyfill and register your tools. No build process, no
          complex setup.
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
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-charcoal-900 dark:text-white">
                  Polyfill webMCP
                </h3>
                <div className="inline-flex border border-neutral-800 bg-neutral-900">
                  <button
                    onClick={() => setPolyfillTab("iife")}
                    className={`px-3 py-1 text-xs font-medium uppercase tracking-wider transition-all ${
                      polyfillTab === "iife"
                        ? "bg-white text-black"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    IIFE
                  </button>
                  <button
                    onClick={() => setPolyfillTab("esm")}
                    className={`border-l border-neutral-800 px-3 py-1 text-xs font-medium uppercase tracking-wider transition-all ${
                      polyfillTab === "esm"
                        ? "bg-white text-black"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    ESM
                  </button>
                </div>
              </div>
              <AICodeBlock
                code={polyfillTab === "iife" ? iifePolyfill : esmPolyfill}
                language={polyfillTab === "iife" ? "html" : "typescript"}
              >
                <CodeBlockCopyButton />
              </AICodeBlock>
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
                <div className="inline-flex border border-neutral-800 bg-neutral-900">
                  <button
                    onClick={() => setCodeTab("vanilla")}
                    className={`px-3 py-1 text-xs font-medium uppercase tracking-wider transition-all ${
                      codeTab === "vanilla"
                        ? "bg-white text-black"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Vanilla
                  </button>
                  <button
                    onClick={() => setCodeTab("react")}
                    className={`border-l border-neutral-800 px-3 py-1 text-xs font-medium uppercase tracking-wider transition-all ${
                      codeTab === "react"
                        ? "bg-white text-black"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    React
                  </button>
                </div>
              </div>
              <AICodeBlock
                code={codeTab === "vanilla" ? vanillaCode : reactCode}
                language={codeTab === "vanilla" ? "javascript" : "typescript"}
                showLineNumbers
              >
                {isToolRegistered && (
                  <span className="inline-flex items-center gap-1.5 border border-green-800 bg-green-950 px-2 py-0.5 text-xs font-medium text-green-400">
                    <span className="h-1.5 w-1.5 animate-pulse bg-green-500"></span>
                    LIVE
                    {toolCallCount > 0 && ` • ${toolCallCount}`}
                  </span>
                )}
                <CodeBlockCopyButton />
              </AICodeBlock>
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
            <div className="border border-neutral-800 bg-neutral-900 p-6">
              <h4 className="font-semibold text-white">
                Framework Agnostic
              </h4>
              <p className="mt-2 text-sm text-neutral-400">
                Works with any JavaScript framework or plain HTML. The API is
                the same everywhere.
              </p>
            </div>
            <div className="border border-neutral-800 bg-neutral-900 p-6">
              <h4 className="font-semibold text-white">
                W3C Standard API
              </h4>
              <p className="mt-2 text-neutral-400 text-sm">
                Built on navigator.modelContext. Standards-based and
                future-proof.
              </p>
            </div>
          </div>

          {/* Try it callout */}
          {isToolRegistered && (
            <div className="mt-6 border border-blue-900 bg-blue-950/50 p-4">
              <p className="text-sm text-blue-100">
                <strong className="text-white">Try it now:</strong> This tool is live on this page.
                Open your AI assistant and say:{" "}
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
