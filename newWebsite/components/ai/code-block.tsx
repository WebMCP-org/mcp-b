"use client";

import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Context for sharing code between CodeBlock and CodeBlockCopyButton
interface CodeBlockContextValue {
  code: string;
}

const CodeBlockContext = React.createContext<CodeBlockContextValue | undefined>(
  undefined
);

function useCodeBlock() {
  const context = React.useContext(CodeBlockContext);
  if (!context) {
    throw new Error("CodeBlock components must be used within CodeBlock");
  }
  return context;
}

// Main CodeBlock component
interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const value = React.useMemo(() => ({ code }), [code]);

  // Use appropriate theme based on current mode
  const style = mounted && resolvedTheme === "dark" ? oneDark : oneLight;

  return (
    <CodeBlockContext.Provider value={value}>
      <div
        className={cn(
          "relative rounded-lg border border-border bg-background overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Header with copy button */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <span className="text-xs font-mono text-muted-foreground uppercase">
            {language}
          </span>
          {children}
        </div>

        {/* Code display */}
        <div className="overflow-x-auto">
          {mounted ? (
            <SyntaxHighlighter
              language={language}
              style={style}
              showLineNumbers={showLineNumbers}
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "transparent",
                fontSize: "14px",
              }}
              codeTagProps={{
                style: {
                  fontFamily: "var(--font-geist-mono, monospace)",
                },
              }}
            >
              {code}
            </SyntaxHighlighter>
          ) : (
            <pre className="p-4 text-sm font-mono">
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>
    </CodeBlockContext.Provider>
  );
}

// Copy button component
interface CodeBlockCopyButtonProps
  extends React.ComponentProps<typeof Button> {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
}

export function CodeBlockCopyButton({
  onCopy,
  onError,
  timeout = 2000,
  className,
  ...props
}: CodeBlockCopyButtonProps) {
  const { code } = useCodeBlock();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.();

      // Reset copied state after timeout
      setTimeout(() => {
        setCopied(false);
      }, timeout);
    } catch (error) {
      onError?.(error as Error);
      console.error("Failed to copy code:", error);
    }
  }, [code, onCopy, onError, timeout]);

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={handleCopy}
      className={cn(
        "h-7 w-7 text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      <span className="sr-only">{copied ? "Copied" : "Copy code"}</span>
    </Button>
  );
}
