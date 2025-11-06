"use client";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";

export const CodeExample = () => {
  const [activeTab, setActiveTab] = useState<"vanilla" | "react">("vanilla");
  const [isToolRegistered, setIsToolRegistered] = useState(false);

  // Register the actual live tool on this page
  useEffect(() => {
    if (typeof window === "undefined") return;

    const registerLiveTool = async () => {
      if (!window.navigator?.modelContext?.registerTool) {
        return;
      }

      try {
        await window.navigator.modelContext.registerTool({
          name: "sayHello",
          description: "Says hello to a person by name",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string" },
            },
            required: ["name"],
          },
          async execute({ name }: { name: string }) {
            return {
              content: [{ type: "text", text: `Hello ${name}!` }],
            };
          },
        });

        setIsToolRegistered(true);
      } catch (error) {
        console.error("Failed to register tool:", error);
      }
    };

    registerLiveTool();
  }, []);

  const vanillaCode = `navigator.modelContext.registerTool({
  name: "sayHello",
  description: "Says hello to a person by name",
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string" }
    },
    required: ["name"]
  },
  async execute({ name }) {
    return {
      content: [{ type: "text", text: \`Hello \${name}!\` }]
    };
  }
});`;

  const reactCode = `import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    const registration = navigator.modelContext.registerTool({
      name: "sayHello",
      description: "Says hello to a person by name",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" }
        },
        required: ["name"]
      },
      async execute({ name }) {
        return {
          content: [{ type: "text", text: \`Hello \${name}!\` }]
        };
      }
    });

    // Cleanup on unmount
    return () => registration.unregister?.();
  }, []);

  return <div>My AI-Ready App</div>;
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

        {/* Installation step */}
        <div className="mt-12 w-full max-w-4xl">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Step 1: Include the Polyfill
          </h3>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Add this script tag to your HTML to enable the{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs dark:bg-neutral-800">
              navigator.modelContext
            </code>{" "}
            API:
          </p>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-neutral-700 dark:bg-neutral-800">
              <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                HTML
              </span>
            </div>
            <SyntaxHighlighter
              language="html"
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
              {`<script src="https://unpkg.com/@mcp-b/global@latest/dist/index.iife.js"></script>`}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Code examples with toggle */}
        <div className="mt-12 w-full max-w-4xl">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Step 2: Register Your Tools
          </h3>

          {/* Tab switcher */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setActiveTab("vanilla")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "vanilla"
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
              }`}
            >
              Vanilla JS
            </button>
            <button
              onClick={() => setActiveTab("react")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "react"
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
              }`}
            >
              React
            </button>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-neutral-600"></div>
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-neutral-600"></div>
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-neutral-600"></div>
                <span className="ml-4 font-mono text-xs text-gray-500 dark:text-gray-400">
                  {activeTab === "vanilla" ? "app.js" : "MyComponent.tsx"}
                </span>
              </div>
              {isToolRegistered && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                  Active
                </span>
              )}
            </div>

            {/* Code */}
            <SyntaxHighlighter
              language={activeTab === "vanilla" ? "javascript" : "typescript"}
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
              {activeTab === "vanilla" ? vanillaCode : reactCode}
            </SyntaxHighlighter>
          </div>

          {/* Info cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Framework Agnostic
              </h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Works with any JavaScript framework or plain HTML. The API is
                the same everywhere.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <h4 className="font-semibold text-gray-900 dark:text-white">
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
                  &quot;Use the sayHello tool to greet Alice&quot;
                </code>
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
