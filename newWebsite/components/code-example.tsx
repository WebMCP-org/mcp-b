import React from "react";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";

export const CodeExample = () => {
  return (
    <Container className="border-divide border-x py-20">
      <div className="flex flex-col items-center px-4 md:px-8">
        <Badge text="See It In Action" />
        <SectionHeading className="mt-4">
          Protocol-Level Simplicity
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-2xl">
          This is all it takes to expose a function to AI agents. No configuration, no auth setup, no separate servers. Just register your tools and they become instantly accessible.
        </SubHeading>

        <div className="mt-12 w-full max-w-4xl">
          <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-gray-900 shadow-2xl dark:border-neutral-700">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-xs text-gray-400">my-app.ts</div>
            </div>

            {/* Code */}
            <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
              <code className="text-gray-300">
                <span className="text-purple-400">import</span>{" "}
                <span className="text-blue-300">{"{ TabServerTransport }"}</span>{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-green-400">'@mcp-b/transports'</span>;{"\n"}
                <span className="text-purple-400">import</span>{" "}
                <span className="text-blue-300">{"{ McpServer }"}</span>{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-green-400">'@modelcontextprotocol/sdk/server/mcp.js'</span>;{"\n"}
                <span className="text-purple-400">import</span>{" "}
                <span className="text-blue-300">{"{ z }"}</span>{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-green-400">'zod'</span>;{"\n"}
                {"\n"}
                <span className="text-purple-400">const</span>{" "}
                <span className="text-blue-300">server</span> ={" "}
                <span className="text-purple-400">new</span>{" "}
                <span className="text-yellow-300">McpServer</span>({"{"}{"\n"}
                {"  "}name: <span className="text-green-400">'my-app'</span>,{"\n"}
                {"  "}version: <span className="text-green-400">'1.0.0'</span>{"\n"}
                {"});"}{"\n"}
                {"\n"}
                <span className="text-gray-500">// Register a tool that AI agents can call</span>{"\n"}
                server.<span className="text-yellow-300">tool</span>(
                <span className="text-green-400">'sayHello'</span>,
                <span className="text-green-400">'Says hello'</span>, {"{"}{"\n"}
                {"  "}name: z.<span className="text-yellow-300">string</span>(){"\n"}
                {"}"}, <span className="text-purple-400">async</span> ({"{ "}name{" }"}) {"=>"} ({"{"}{"\n"}
                {"  "}content: [{"{ "}type: <span className="text-green-400">'text'</span>, text: <span className="text-orange-300">`Hello ${"{"}name{"}"}`</span>{" }"}]{"\n"}
                {"}));"}{"\n"}
                {"\n"}
                <span className="text-gray-500">// Connect - extension auto-discovers this tool</span>{"\n"}
                <span className="text-purple-400">await</span> server.<span className="text-yellow-300">connect</span>(
                <span className="text-purple-400">new</span>{" "}
                <span className="text-yellow-300">TabServerTransport</span>({"{"}{" "}
                allowedOrigins: [<span className="text-green-400">'*'</span>]{" "}
                {"})"});
              </code>
            </pre>

            {/* Output preview */}
            <div className="border-t border-gray-700 bg-gray-800 px-6 py-4">
              <div className="flex items-start gap-3">
                <div className="text-green-400">→</div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400">AI Agent calls tool:</div>
                  <div className="mt-1 font-mono text-sm text-gray-300">
                    sayHello({"{ "}name: <span className="text-green-400">"World"</span>{" }"})
                  </div>
                  <div className="mt-2 text-xs text-gray-400">Response:</div>
                  <div className="mt-1 font-mono text-sm text-blue-300">
                    "Hello World!"
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key points */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-neutral-800">
              <h4 className="font-medium text-gray-900 dark:text-white">
                15 Lines of Code
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                That's all it takes. No boilerplate, no configuration files, no auth setup.
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
                Protocol-Native
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Built on MCP standard. Works with any MCP-compatible AI assistant out of the box.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
