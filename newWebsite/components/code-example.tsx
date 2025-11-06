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
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          Add AI Capabilities in Minutes
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-2xl text-center">
          Include the polyfill and register your tools. No build process, no
          complex setup.
        </SubHeading>

        {/* Step 1: Polyfill Installation */}
        <div className="mt-12 w-full max-w-4xl">
          <h3 className="mb-3 text-lg font-semibold text-charcoal-900 dark:text-white">
            Step 1: Include the Polyfill
          </h3>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Add the{" "}
            <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs dark:bg-charcoal-800">
              @mcp-b/global
            </code>{" "}
            polyfill to enable the{" "}
            <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs dark:bg-charcoal-800">
              navigator.modelContext
            </code>{" "}
            API:
          </p>

          {/* Aceternity-style polyfill toggle */}
          <div className="mb-4 inline-flex rounded-lg border border-gray-300 bg-gray-100 p-1 dark:border-neutral-700 dark:bg-charcoal-800">
            <button
              onClick={() => setPolyfillTab("iife")}
              className={`relative rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                polyfillTab === "iife"
                  ? "bg-white text-charcoal-900 shadow-sm dark:bg-charcoal-900 dark:text-white"
                  : "text-gray-600 hover:text-charcoal-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              IIFE (CDN)
            </button>
            <button
              onClick={() => setPolyfillTab("esm")}
              className={`relative rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                polyfillTab === "esm"
                  ? "bg-white text-charcoal-900 shadow-sm dark:bg-charcoal-900 dark:text-white"
                  : "text-gray-600 hover:text-charcoal-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              ESM (npm)
            </button>
          </div>

          <div className="border-divide overflow-hidden rounded-lg border bg-white shadow-sm dark:border-neutral-700 dark:bg-charcoal-900">
            <div className="border-divide flex items-center justify-between border-b bg-gray-50 px-4 py-2 dark:border-neutral-700 dark:bg-charcoal-800">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <span className="ml-4 font-mono text-xs text-gray-500 dark:text-gray-400">
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
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-charcoal-700"
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
          <h3 className="mb-3 text-lg font-semibold text-charcoal-900 dark:text-white">
            Step 2: Register Your Tools
          </h3>

          {/* Aceternity-style code toggle */}
          <div className="mb-4 inline-flex rounded-lg border border-gray-300 bg-gray-100 p-1 dark:border-neutral-700 dark:bg-charcoal-800">
            <button
              onClick={() => setCodeTab("vanilla")}
              className={`relative rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                codeTab === "vanilla"
                  ? "bg-white text-charcoal-900 shadow-sm dark:bg-charcoal-900 dark:text-white"
                  : "text-gray-600 hover:text-charcoal-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Vanilla JS
            </button>
            <button
              onClick={() => setCodeTab("react")}
              className={`relative rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                codeTab === "react"
                  ? "bg-white text-charcoal-900 shadow-sm dark:bg-charcoal-900 dark:text-white"
                  : "text-gray-600 hover:text-charcoal-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              React (useWebMCP)
            </button>
          </div>

          <div className="border-divide overflow-hidden rounded-lg border bg-white shadow-sm dark:border-neutral-700 dark:bg-charcoal-900">
            {/* Header */}
            <div className="border-divide flex items-center justify-between border-b bg-gray-50 px-4 py-3 dark:border-neutral-700 dark:bg-charcoal-800">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <span className="ml-4 font-mono text-xs text-gray-500 dark:text-gray-400">
                  {codeTab === "vanilla" ? "app.js" : "MyComponent.tsx"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isToolRegistered && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                    Live on this page
                    {toolCallCount > 0 && ` • ${toolCallCount} calls`}
                  </span>
                )}
                <button
                  onClick={() =>
                    handleCopy(
                      codeTab === "vanilla" ? vanillaCode : reactCode,
                      "code"
                    )
                  }
                  className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-charcoal-700"
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

          {/* Info cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border-divide rounded-lg border bg-gray-50 p-4 dark:border-neutral-700 dark:bg-charcoal-800">
              <h4 className="font-semibold text-charcoal-900 dark:text-white">
                Framework Agnostic
              </h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Works with any JavaScript framework or plain HTML. The API is
                the same everywhere.
              </p>
            </div>
            <div className="border-divide rounded-lg border bg-gray-50 p-4 dark:border-neutral-700 dark:bg-charcoal-800">
              <h4 className="font-semibold text-charcoal-900 dark:text-white">
                W3C Standard API
              </h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Built on navigator.modelContext. Standards-based and
                future-proof.
              </p>
            </div>
          </div>

          {/* Try it callout */}
          {isToolRegistered && (
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Try it now:</strong> This tool is live on this page.
                Open your AI assistant and say:{" "}
                <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs dark:bg-blue-950">
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
