"use client";
import React, { useEffect, useState } from "react";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";

export const CodeExample = () => {
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

  return (
    <Container className="border-divide border-x py-20">
      <div className="flex flex-col items-center px-4 md:px-8">
        <Badge text="Quick Start" />
        <SectionHeading className="mt-4">
          Add AI Capabilities in Minutes
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-2xl text-center">
          Include one script tag and register your tools. No build process, no
          complex setup.
        </SubHeading>

        <div className="mt-12 w-full max-w-4xl">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-neutral-600"></div>
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-neutral-600"></div>
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-neutral-600"></div>
                <span className="ml-4 font-mono text-xs text-gray-500 dark:text-gray-400">
                  index.html
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
            <div className="p-6">
              <pre className="overflow-x-auto font-mono text-sm leading-relaxed">
                <code className="text-gray-800 dark:text-gray-200">
                  <span className="text-gray-500 dark:text-gray-400">&lt;!DOCTYPE html&gt;</span>
                  {"\n"}
                  <span className="text-gray-500 dark:text-gray-400">&lt;html&gt;</span>
                  {"\n"}
                  <span className="text-gray-500 dark:text-gray-400">&lt;head&gt;</span>
                  {"\n  "}
                  <span className="text-gray-500 dark:text-gray-400">&lt;script </span>
                  <span className="text-blue-600 dark:text-blue-400">src</span>
                  <span className="text-gray-500 dark:text-gray-400">=</span>
                  <span className="text-green-600 dark:text-green-400">&quot;https://unpkg.com/@mcp-b/global@latest/dist/index.iife.js&quot;</span>
                  <span className="text-gray-500 dark:text-gray-400">&gt;&lt;/script&gt;</span>
                  {"\n"}
                  <span className="text-gray-500 dark:text-gray-400">&lt;/head&gt;</span>
                  {"\n"}
                  <span className="text-gray-500 dark:text-gray-400">&lt;body&gt;</span>
                  {"\n  "}
                  <span className="text-gray-500 dark:text-gray-400">&lt;h1&gt;</span>
                  My Website
                  <span className="text-gray-500 dark:text-gray-400">&lt;/h1&gt;</span>
                  {"\n  "}
                  <span className="text-gray-500 dark:text-gray-400">&lt;script&gt;</span>
                  {"\n    "}
                  <span className="text-blue-600 dark:text-blue-400">navigator</span>.
                  <span className="text-blue-600 dark:text-blue-400">modelContext</span>.
                  <span className="text-purple-600 dark:text-purple-400">registerTool</span>
                  {"({"}
                  {"\n      "}
                  <span className="text-blue-600 dark:text-blue-400">name</span>:
                  <span className="text-green-600 dark:text-green-400"> &quot;sayHello&quot;</span>,
                  {"\n      "}
                  <span className="text-blue-600 dark:text-blue-400">description</span>:
                  <span className="text-green-600 dark:text-green-400"> &quot;Says hello to a person&quot;</span>,
                  {"\n      "}
                  <span className="text-blue-600 dark:text-blue-400">inputSchema</span>: {"{"}
                  {"\n        "}
                  <span className="text-blue-600 dark:text-blue-400">type</span>:
                  <span className="text-green-600 dark:text-green-400"> &quot;object&quot;</span>,
                  {"\n        "}
                  <span className="text-blue-600 dark:text-blue-400">properties</span>: {"{"}
                  {"\n          "}
                  <span className="text-blue-600 dark:text-blue-400">name</span>: {"{ "}
                  <span className="text-blue-600 dark:text-blue-400">type</span>:
                  <span className="text-green-600 dark:text-green-400"> &quot;string&quot;</span>
                  {" }"}
                  {"\n        "},
                  {"\n        "}
                  <span className="text-blue-600 dark:text-blue-400">required</span>: [
                  <span className="text-green-600 dark:text-green-400">&quot;name&quot;</span>]
                  {"\n      }"},
                  {"\n      "}
                  <span className="text-purple-600 dark:text-purple-400">async</span>{" "}
                  <span className="text-purple-600 dark:text-purple-400">execute</span>
                  {"({ name }) {"}
                  {"\n        "}
                  <span className="text-purple-600 dark:text-purple-400">return</span> {"{"}
                  {"\n          "}
                  <span className="text-blue-600 dark:text-blue-400">content</span>: [{"{"}
                  {"\n            "}
                  <span className="text-blue-600 dark:text-blue-400">type</span>:
                  <span className="text-green-600 dark:text-green-400"> &quot;text&quot;</span>,
                  {"\n            "}
                  <span className="text-blue-600 dark:text-blue-400">text</span>:
                  <span className="text-green-600 dark:text-green-400"> `Hello $</span>
                  <span className="text-gray-500 dark:text-gray-400">{"{"}</span>
                  name
                  <span className="text-gray-500 dark:text-gray-400">{"}"}</span>
                  <span className="text-green-600 dark:text-green-400">`</span>
                  {"\n          }]"}
                  {"\n        }"}
                  {"\n      }"}
                  {"\n    })"}
                  {"\n  "}
                  <span className="text-gray-500 dark:text-gray-400">&lt;/script&gt;</span>
                  {"\n"}
                  <span className="text-gray-500 dark:text-gray-400">&lt;/body&gt;</span>
                  {"\n"}
                  <span className="text-gray-500 dark:text-gray-400">&lt;/html&gt;</span>
                </code>
              </pre>
            </div>
          </div>

          {/* Info cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                One Script Tag
              </h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Include the polyfill and start registering tools. Works with any
                framework or plain HTML.
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
                <strong>Try it now:</strong> This tool is live on this page. Open
                your AI assistant and say: <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs dark:bg-blue-950">&quot;Use the sayHello tool to greet Alice&quot;</code>
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
