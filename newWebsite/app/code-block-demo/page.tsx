"use client";

import { CodeBlock, CodeBlockCopyButton } from "@/components/ai/code-block";

export default function CodeBlockDemoPage() {
  const exampleCode = `import { CodeBlock, CodeBlockCopyButton } from "@/components/ai/code-block";

export function MyComponent() {
  const code = \`
    function greet(name: string) {
      return \`Hello, \${name}!\`;
    }
  \`;

  return (
    <CodeBlock code={code} language="typescript" showLineNumbers>
      <CodeBlockCopyButton />
    </CodeBlock>
  );
}`;

  const pythonCode = `def fibonacci(n):
    """Generate fibonacci sequence up to n terms"""
    a, b = 0, 1
    result = []

    for _ in range(n):
        result.append(a)
        a, b = b, a + b

    return result

# Example usage
print(fibonacci(10))`;

  const jsonCode = `{
  "name": "mcp-b",
  "version": "1.0.0",
  "description": "Browser Model Context Protocol",
  "features": [
    "Syntax highlighting",
    "Copy button",
    "Theme-aware",
    "Line numbers"
  ]
}`;

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2">AI Code Block Component</h1>
      <p className="text-muted-foreground mb-8">
        Syntax-highlighted code blocks with copy buttons for AI responses
      </p>

      <div className="space-y-8">
        {/* TypeScript Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">TypeScript Example</h2>
          <CodeBlock
            code={exampleCode}
            language="typescript"
            showLineNumbers
          >
            <CodeBlockCopyButton />
          </CodeBlock>
        </section>

        {/* Python Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Python Example</h2>
          <CodeBlock code={pythonCode} language="python" showLineNumbers>
            <CodeBlockCopyButton />
          </CodeBlock>
        </section>

        {/* JSON Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">JSON Example</h2>
          <CodeBlock code={jsonCode} language="json">
            <CodeBlockCopyButton />
          </CodeBlock>
        </section>

        {/* Usage Instructions */}
        <section className="mt-12 p-6 border rounded-lg bg-muted/50">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Syntax highlighting for multiple languages (powered by Prism)</li>
            <li>Automatic theme switching (dark/light mode)</li>
            <li>Copy to clipboard with visual feedback</li>
            <li>Optional line numbers</li>
            <li>Horizontal scroll for long lines (preserves formatting)</li>
            <li>Language indicator in header</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Installation</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Dependencies are already installed:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>react-syntax-highlighter</li>
            <li>@types/react-syntax-highlighter</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Basic Usage</h3>
          <CodeBlock
            code={`import { CodeBlock, CodeBlockCopyButton } from "@/components/ai/code-block";

<CodeBlock code="const x = 42;" language="javascript">
  <CodeBlockCopyButton />
</CodeBlock>`}
            language="tsx"
          >
            <CodeBlockCopyButton />
          </CodeBlock>
        </section>
      </div>
    </div>
  );
}
