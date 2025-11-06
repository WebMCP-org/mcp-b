import { LiveBrowserDemo } from "@/components/live-browser-demo";
import { CodeExample } from "@/components/code-example";
import { DivideX } from "@/components/divide";
import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: "Live Demo - MCP-B",
  description:
    "Try the MCP-B Chrome extension live in your browser. Experience AI-enabled websites in action.",
  url: "/mcp-b-playground",
});

export default function McpBPlaygroundPage() {
  return (
    <div>
      <DivideX />
      <LiveBrowserDemo />
      <DivideX />
      <CodeExample />
    </div>
  );
}
