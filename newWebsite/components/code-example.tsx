"use client";
import React, { useEffect, useState } from "react";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";

export const CodeExample = () => {
  const [activeTab, setActiveTab] = useState<"vanilla" | "react">("vanilla");
  const [isToolRegistered, setIsToolRegistered] = useState(false);
  const [toolCalls, setToolCalls] = useState<Array<{
    name: string;
    time: string;
    result?: string;
  }>>([]);

  // Register the actual live tool on this page
  useEffect(() => {
    if (typeof window === "undefined") return;

    const registerLiveTool = async () => {
      // Check if the extension/polyfill is available
      if (!window.navigator?.modelContext?.registerTool) {
        console.log("WebMCP not available - extension not installed");
        return;
      }

      try {
        await window.navigator.modelContext.registerTool({
          name: "sayHello",
          description: "Says hello to a person by name",
          inputSchema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "The name of the person to greet",
              },
            },
            required: ["name"],
          },
          async execute({ name }: { name: string }) {
            const result = `Hello ${name}!`;

            // Track the call in the UI
            setToolCalls((prev) => [
              ...prev,
              {
                name,
                time: new Date().toLocaleTimeString(),
                result,
              },
            ]);

            return {
              content: [
                {
                  type: "text",
                  text: result,
                },
              ],
            };
          },
        });

        setIsToolRegistered(true);
        console.log("✅ sayHello tool registered successfully");
      } catch (error) {
        console.error("Failed to register tool:", error);
      }
    };

    registerLiveTool();
  }, []);

  const vanillaCode = `<!DOCTYPE html>
<html>
<head>
  <!-- Add the WebMCP polyfill -->
  <script src="https://unpkg.com/@mcp-b/global@latest/dist/index.iife.js"></script>
</head>
<body>
  <h1>My AI-Ready Website</h1>

  <script>
    // Register a tool for AI agents
    window.navigator.modelContext.registerTool({
      name: "sayHello",
      description: "Says hello to a person by name",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the person to greet"
          }
        },
        required: ["name"]
      },
      async execute({ name }) {
        return {
          content: [{
            type: "text",
            text: \`Hello \${name}!\`
          }]
        };
      }
    });
  </script>
</body>
</html>`;

  const reactCode = `import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Register tool when component mounts
    const registration = window.navigator.modelContext.registerTool({
      name: "sayHello",
      description: "Says hello to a person by name",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the person to greet"
          }
        },
        required: ["name"]
      },
      async execute({ name }) {
        return {
          content: [{
            type: "text",
            text: \`Hello \${name}!\`
          }]
        };
      }
    });

    // Cleanup: unregister when component unmounts
    return () => registration.unregister();
  }, []);

  return <h1>My AI-Ready App</h1>;
}`;

  return (
    <Container className="border-divide border-x py-20">
      <div className="flex flex-col items-center px-4 md:px-8">
        <Badge text="See It In Action" />
        <SectionHeading className="mt-4">
          Protocol-Level Simplicity
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-2xl">
          This is all it takes to expose a function to AI agents. No
          configuration, no auth setup, no separate servers. Just register your
          tools and they become instantly accessible.
        </SubHeading>

        <div className="mt-12 w-full max-w-4xl">
          {/* Tab switcher */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setActiveTab("vanilla")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "vanilla"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Vanilla JS
            </button>
            <button
              onClick={() => setActiveTab("react")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "react"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              React
            </button>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-gray-900 shadow-2xl dark:border-neutral-700">
            {/* Browser chrome */}
            <div className="flex items-center justify-between gap-2 border-b border-gray-700 bg-gray-800 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-xs text-gray-400">
                  {activeTab === "vanilla" ? "index.html" : "MyComponent.tsx"}
                </div>
              </div>
              {isToolRegistered && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Live on this page
                </span>
              )}
            </div>

            {/* Code */}
            <pre className="overflow-x-auto p-6 text-sm leading-relaxed max-h-96">
              <code className="text-gray-300">
                {activeTab === "vanilla" ? (
                  <span dangerouslySetInnerHTML={{ __html: highlightVanilla(vanillaCode) }} />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: highlightReact(reactCode) }} />
                )}
              </code>
            </pre>

            {/* Live demo section */}
            {toolCalls.length > 0 && (
              <div className="border-t border-gray-700 bg-gray-800 px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className="text-green-400">→</div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-2">Recent AI calls to this tool:</div>
                    <div className="space-y-2">
                      {toolCalls.slice(-3).reverse().map((call, idx) => (
                        <div key={idx} className="font-mono text-sm">
                          <div className="text-gray-400">
                            <span className="text-blue-300">sayHello</span>(
                            {"{ "}name: <span className="text-green-400">&quot;{call.name}&quot;</span>
                            {" }"})
                          </div>
                          <div className="text-blue-300 ml-4">
                            → &quot;{call.result}&quot;
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Key points */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-neutral-800">
              <h4 className="font-medium text-gray-900 dark:text-white">
                One Script Tag
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Drop in the polyfill and start registering tools. No build step, no npm packages required.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-neutral-800">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Auto-Discovery
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                MCP-B extension finds and registers your tools automatically. Zero manual configuration.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-neutral-800">
              <h4 className="font-medium text-gray-900 dark:text-white">
                W3C Standard
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Built on navigator.modelContext API. Future-proof, standards-based approach.
              </p>
            </div>
          </div>

          {/* Try it callout */}
          <div className="mt-8 p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-2xl">💡</div>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  This tool is live on this page right now!
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                  If you have the MCP-B extension installed, open your AI assistant and try:
                </p>
                <div className="bg-white dark:bg-blue-950 rounded p-3 font-mono text-sm text-blue-900 dark:text-blue-100">
                  &quot;Use the sayHello tool to greet Alice&quot;
                </div>
                {!isToolRegistered && (
                  <p className="mt-3 text-xs text-blue-700 dark:text-blue-300">
                    ⚠️ Tool not registered - install the{" "}
                    <a
                      href="https://chromewebstore.google.com/detail/mcp-b-extension/daohopfhkdelnpemnhlekblhnikhdhfa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      MCP-B extension
                    </a>{" "}
                    to enable
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

// Syntax highlighting helpers (simple HTML injection)
function highlightVanilla(code: string): string {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(&lt;!DOCTYPE html&gt;|&lt;html&gt;|&lt;\/html&gt;|&lt;head&gt;|&lt;\/head&gt;|&lt;body&gt;|&lt;\/body&gt;|&lt;h1&gt;|&lt;\/h1&gt;|&lt;script.*?&gt;|&lt;\/script&gt;)/g, '<span class="text-purple-400">$1</span>')
    .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
    .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
    .replace(/\b(const|let|var|function|async|await|return|window|document|type|properties|required|description)\b/g, '<span class="text-purple-400">$1</span>')
    .replace(/\b(navigator|modelContext|registerTool|execute|content|text)\b/g, '<span class="text-yellow-300">$1</span>');
}

function highlightReact(code: string): string {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
    .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
    .replace(/\b(import|from|const|let|function|async|await|return|type|properties|required|description)\b/g, '<span class="text-purple-400">$1</span>')
    .replace(/\b(useEffect|navigator|modelContext|registerTool|execute|content|text|unregister)\b/g, '<span class="text-yellow-300">$1</span>')
    .replace(/(&lt;h1&gt;|&lt;\/h1&gt;)/g, '<span class="text-blue-300">$1</span>');
}
