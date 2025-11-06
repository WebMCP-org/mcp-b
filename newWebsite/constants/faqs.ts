export const faqs = [
  {
    question: "What is MCP-B?",
    answer:
      "MCP-B (Model Context Protocol for Browsers) is an implementation of Anthropic's MCP standard that brings AI-agent communication to the browser. It enables websites to expose tools and context to AI assistants by embedding MCP servers directly into web pages.",
  },
  {
    question: "How is this different from desktop MCP servers?",
    answer:
      "Unlike desktop MCP servers that require installation and configuration, MCP-B works directly in the browser with no installation. Just visit a website with MCP-B integration and it's immediately available to your AI assistant via the browser extension. Plus, it uses your existing browser session for authentication instead of requiring OAuth or API keys.",
  },
  {
    question: "Is it secure?",
    answer:
      "Yes! MCP-B uses the browser's existing security model including same-origin policy, user consent for cross-origin communication, and sandboxed execution. All tool calls use your existing browser sessions and respect your current permissions. No API keys or credentials need to be shared.",
  },
  {
    question: "Which AI assistants support MCP-B?",
    answer:
      "Any AI assistant that supports the MCP protocol can work with MCP-B through our Chrome extension. The extension acts as a bridge between desktop AI apps (like Claude Desktop) and browser-based MCP servers.",
  },
  {
    question: "How do I add MCP-B to my website?",
    answer:
      "Adding MCP-B to your website is straightforward. Install the MCP-B package, register your tools using the navigator.modelContext API, and define what actions your website exposes to AI agents. Check out our documentation at docs.mcp-b.ai for detailed integration guides and examples.",
  },
  {
    question: "Is MCP-B open source?",
    answer:
      "Yes! MCP-B is completely open source. You can view the code, contribute, or fork it for your own projects on GitHub. We believe in transparency and community-driven development.",
  },
  {
    question: "How does MCP-B perform compared to traditional browser automation?",
    answer:
      "MCP-B is dramatically faster than traditional browser automation. While screen-scraping solutions take 10-20 seconds per action and cost $4-5 in API calls, MCP-B executes the same tasks in milliseconds with direct API calls. It's approximately 10,000x faster and doesn't require multiple LLM calls to parse UI elements.",
  },
  {
    question: "Do I need to implement OAuth or manage API keys?",
    answer:
      "No! That's one of the key advantages of MCP-B. Since the MCP server runs in the browser tab where the user is already logged in, it automatically uses the existing browser session. Your APIs work exactly as they do for your regular web application, with no additional authentication layer needed.",
  },
];
