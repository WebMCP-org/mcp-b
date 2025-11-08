"use client";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";

// Copy and check icons
const CopyIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export const CodeExample = () => {
  const [polyfillTab, setPolyfillTab] = useState<"esm" | "iife">("iife");
  const [codeTab, setCodeTab] = useState<"vanilla" | "react">("vanilla");
  const [isToolRegistered, setIsToolRegistered] = useState(false);
  const [toolCallCount, setToolCallCount] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  // Handle copy to clipboard
  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

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
          AI-Accessible in ~50 Lines
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-2xl text-center">
          Include the MCP-B polyfill and register your tools using navigator.modelContext. The same approach running in production at JPMorgan and Adobe. No server deployment, no build changes.
        </SubHeading>

        {/* Step 1: Polyfill Installation */}
        <div className="mt-12 w-full max-w-4xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-charcoal-900 dark:text-white">
              Step 1: Include the Polyfill
            </h3>
            {/* Square, dark toggle - side by side */}
            <div className="inline-flex border border-neutral-800 bg-neutral-900">
              <button
                onClick={() => setPolyfillTab("iife")}
                className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                  polyfillTab === "iife"
                    ? "bg-white text-black"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                IIFE
              </button>
              <button
                onClick={() => setPolyfillTab("esm")}
                className={`border-l border-neutral-800 px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                  polyfillTab === "esm"
                    ? "bg-white text-black"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                ESM
              </button>
            </div>
          </div>

          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Add the{" "}
            <code className="bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-white">
              @mcp-b/global
            </code>{" "}
            polyfill to enable the{" "}
            <code className="bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-white">
              navigator.modelContext
            </code>{" "}
            API:
          </p>

          <div className="overflow-hidden border border-neutral-800 bg-charcoal-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 bg-black px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
                <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
                <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
                <span className="ml-4 font-mono text-xs text-neutral-500">
                  {polyfillTab === "iife" ? "index.html" : "main.ts"}
                </span>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    polyfillTab === "iife" ? iifePolyfill : esmPolyfill,
                    "polyfill"
                  )
                }
                className="flex items-center gap-1.5 border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs font-medium text-neutral-400 transition-colors hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
              >
                {copied === "polyfill" ? (
                  <>
                    <CheckIcon /> Copied
                  </>
                ) : (
                  <>
                    <CopyIcon /> Copy
                  </>
                )}
              </button>
            </div>
            <SyntaxHighlighter
              language={polyfillTab === "iife" ? "html" : "typescript"}
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: "0.875rem",
                background: "transparent",
                padding: "1.25rem",
              }}
              codeTagProps={{
                style: {
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                },
              }}
            >
              {polyfillTab === "iife" ? iifePolyfill : esmPolyfill}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Step 2: Register Tools */}
        <div className="mt-12 w-full max-w-4xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-charcoal-900 dark:text-white">
              Step 2: Register Your Tools
            </h3>
            {/* Square, dark toggle - side by side */}
            <div className="inline-flex border border-neutral-800 bg-neutral-900">
              <button
                onClick={() => setCodeTab("vanilla")}
                className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                  codeTab === "vanilla"
                    ? "bg-white text-black"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Vanilla
              </button>
              <button
                onClick={() => setCodeTab("react")}
                className={`border-l border-neutral-800 px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                  codeTab === "react"
                    ? "bg-white text-black"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                React
              </button>
            </div>
          </div>

          <div className="overflow-hidden border border-neutral-800 bg-charcoal-900 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 bg-black px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
                <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
                <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
                <span className="ml-4 font-mono text-xs text-neutral-500">
                  {codeTab === "vanilla" ? "app.js" : "MyComponent.tsx"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isToolRegistered && (
                  <span className="inline-flex items-center gap-1.5 border border-green-800 bg-green-950 px-2 py-0.5 text-xs font-medium text-green-400">
                    <span className="h-1.5 w-1.5 animate-pulse bg-green-500"></span>
                    LIVE
                    {toolCallCount > 0 && ` • ${toolCallCount}`}
                  </span>
                )}
                <button
                  onClick={() =>
                    handleCopy(
                      codeTab === "vanilla" ? vanillaCode : reactCode,
                      "code"
                    )
                  }
                  className="flex items-center gap-1.5 border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs font-medium text-neutral-400 transition-colors hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
                >
                  {copied === "code" ? (
                    <>
                      <CheckIcon /> Copied
                    </>
                  ) : (
                    <>
                      <CopyIcon /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code */}
            <SyntaxHighlighter
              language={codeTab === "vanilla" ? "javascript" : "typescript"}
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: "0.875rem",
                background: "transparent",
                padding: "1.25rem",
              }}
              codeTagProps={{
                style: {
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                },
              }}
            >
              {codeTab === "vanilla" ? vanillaCode : reactCode}
            </SyntaxHighlighter>
          </div>

          {/* Info cards - darker, more square */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border border-neutral-800 bg-neutral-900 p-4">
              <h4 className="font-semibold text-white">
                Framework Agnostic
              </h4>
              <p className="mt-2 text-sm text-neutral-400">
                Works with React, Vue, Svelte, or vanilla JavaScript. Same navigator.modelContext API everywhere. Zero framework dependencies.
              </p>
            </div>
            <div className="border border-neutral-800 bg-neutral-900 p-4">
              <h4 className="font-semibold text-white">
                MCP-B → WebMCP Standard
              </h4>
              <p className="mt-2 text-sm text-neutral-400">
                Our blog post about MCP-B inspired the WebMCP W3C standard. This navigator.modelContext API is the foundation of that standardization effort.
              </p>
            </div>
          </div>

          {/* Try it callout - darker, more angular */}
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
        </div>
      </div>
    </Container>
  );
};
