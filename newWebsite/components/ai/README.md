# AI Components

This directory contains AI-focused UI components for the MCP-B website.

## CodeBlock Component

Syntax-highlighted code blocks with copy buttons for AI responses. Built with React, TypeScript, and Prism.

### Features

- ✅ Syntax highlighting for multiple programming languages (powered by Prism)
- ✅ Automatic theme switching (dark/light mode support)
- ✅ Copy to clipboard with visual feedback
- ✅ Optional line numbers
- ✅ Horizontal scroll for long lines (preserves formatting)
- ✅ Language indicator in header
- ✅ Theme-aware using next-themes
- ✅ Follows shadcn/ui design patterns

### Installation

Dependencies are already included in package.json:

```json
{
  "react-syntax-highlighter": "^16.1.0",
  "@types/react-syntax-highlighter": "^15.5.13"
}
```

### Basic Usage

```tsx
import { CodeBlock, CodeBlockCopyButton } from "@/components/ai/code-block";

export function MyComponent() {
  const code = `function greet(name: string) {
    return \`Hello, \${name}!\`;
  }`;

  return (
    <CodeBlock code={code} language="typescript">
      <CodeBlockCopyButton />
    </CodeBlock>
  );
}
```

### With Line Numbers

```tsx
<CodeBlock code={code} language="python" showLineNumbers>
  <CodeBlockCopyButton />
</CodeBlock>
```

### API Reference

#### CodeBlock

Container for syntax-highlighted code display.

| Prop              | Type                             | Default      | Description                                  |
| ----------------- | -------------------------------- | ------------ | -------------------------------------------- |
| `code`            | `string`                         | **required** | Code content to display                      |
| `language`        | `string`                         | **required** | Programming language for syntax highlighting |
| `showLineNumbers` | `boolean`                        | `false`      | Display line numbers                         |
| `children`        | `ReactNode`                      | -            | Optional elements (like copy button)         |
| `...props`        | `HTMLAttributes<HTMLDivElement>` | -            | HTML attributes for container                |

#### CodeBlockCopyButton

Copy button with automatic clipboard integration.

| Prop          | Type                     | Default | Description                            |
| ------------- | ------------------------ | ------- | -------------------------------------- |
| `onCopy`      | `() => void`             | -       | Callback after successful copy         |
| `onCopyError` | `(error: Error) => void` | -       | Error handler for copy failure         |
| `timeout`     | `number`                 | `2000`  | Duration to show success state (ms)    |
| `...props`    | `ComponentProps<Button>` | -       | Spreads to underlying Button component |

### Usage with Vercel AI SDK

Works seamlessly with Vercel AI SDK's `experimental_useObject` for structured code generation:

```tsx
"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ai/code-block";
import { z } from "zod";

const codeBlockSchema = z.object({
  language: z.string(),
  filename: z.string(),
  code: z.string(),
});

export default function CodeGen() {
  const [input, setInput] = useState("");
  const { object, submit, isLoading } = useObject({
    api: "/api/codegen",
    schema: codeBlockSchema,
  });

  return (
    <div>
      {object?.code && object?.language && (
        <CodeBlock code={object.code} language={object.language} showLineNumbers>
          <CodeBlockCopyButton />
        </CodeBlock>
      )}
      {/* Your input form here */}
    </div>
  );
}
```

### Supported Languages

The component supports all languages that Prism supports, including but not limited to:

- JavaScript / TypeScript / JSX / TSX
- Python
- Java
- C / C++ / C#
- Go
- Rust
- Ruby
- PHP
- SQL
- JSON / YAML / TOML
- Markdown
- HTML / CSS
- Bash / Shell

For unsupported or unknown languages, the component falls back to plain text display.

### Keyboard Interactions

| Key               | Description                   |
| ----------------- | ----------------------------- |
| `Tab`             | Focus copy button             |
| `Enter` / `Space` | Copy code when button focused |
| `Cmd/Ctrl + A`    | Select all code               |
| `Cmd/Ctrl + C`    | Copy selected code            |

### Demo Page

Visit `/code-block-demo` to see the component in action with various code examples.

## WebPreview Component

Browser-like web preview component for displaying and interacting with web pages. See `web-preview.tsx` for implementation details.
