"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * SVG Icon Components
 */
const CopyIcon: React.FC = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

/**
 * Language to file extension mapping
 */
const LANGUAGE_EXTENSIONS: Record<string, string> = {
  typescript: "ts",
  javascript: "js",
  bash: "sh",
  shell: "sh",
  html: "html",
  css: "css",
  json: "json",
  tsx: "tsx",
  jsx: "jsx",
  python: "py",
  sql: "sql",
  yaml: "yml",
  markdown: "md",
  text: "txt",
} as const;

/**
 * Get file extension for a given language
 */
const getFileExtension = (language: string): string => {
  return LANGUAGE_EXTENSIONS[language.toLowerCase()] || language;
};

/**
 * Extract text content from React children
 * Recursively processes children to get the raw text content
 */
const getChildrenText = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return children;
  }
  if (typeof children === "number") {
    return String(children);
  }
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (props.children) {
      return getChildrenText(props.children);
    }
  }
  if (Array.isArray(children)) {
    return children.map(getChildrenText).join("");
  }
  return "";
};

/**
 * Props for CodeBlock component
 */
interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  filename?: string;
  language?: string;
}

/**
 * CodeBlock component for syntax-highlighted code with copy functionality
 * Matches the professional styling from the landing page
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
  filename,
  language: explicitLanguage,
}) => {
  const [copied, setCopied] = useState(false);

  // Extract language from className (MDX format: "language-typescript")
  const languageFromClass = className?.replace(/^language-/, "") || "text";
  const language = explicitLanguage || languageFromClass;

  // Extract code content from children (handles both string and React elements)
  const code = getChildrenText(children).trim();

  // Handle copy to clipboard with error handling
  const handleCopy = async () => {
    if (!code) return;

    try {
      // Check if clipboard API is available
      if (!navigator?.clipboard?.writeText) {
        console.warn("Clipboard API not available");
        return;
      }

      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  // Determine display filename
  const displayFilename = filename || `code.${getFileExtension(language)}`;

  return (
    <div className="my-6 overflow-hidden border border-gray-300 bg-gray-100/80 backdrop-blur-sm shadow-2xl dark:border-neutral-800 dark:bg-charcoal-900/80">
      {/* Header with filename and copy button */}
      <div className="flex items-center justify-between border-b border-gray-300 bg-gray-50/80 backdrop-blur-sm px-4 py-2.5 dark:border-neutral-800 dark:bg-black/80">
        <div className="flex items-center gap-2">
          {/* Decorative dots */}
          <div className="h-3 w-3 border border-gray-400 bg-gray-300 dark:border-neutral-700 dark:bg-neutral-800"></div>
          <div className="h-3 w-3 border border-gray-400 bg-gray-300 dark:border-neutral-700 dark:bg-neutral-800"></div>
          <div className="h-3 w-3 border border-gray-400 bg-gray-300 dark:border-neutral-700 dark:bg-neutral-800"></div>
          <span className="ml-4 font-mono text-xs text-gray-600 dark:text-neutral-500">{displayFilename}</span>
        </div>
        <button
          onClick={handleCopy}
          disabled={!code}
          className="flex items-center gap-1.5 border border-gray-300 bg-white/60 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-gray-400 hover:bg-white hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white"
          aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        >
          {copied ? (
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

      {/* Syntax highlighted code */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.875rem",
          background: "transparent",
          padding: "1.25rem",
        }}
        codeTagProps={{
          style: {
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

/**
 * Props for InlineCode component
 */
interface InlineCodeProps {
  children?: React.ReactNode;
}

/**
 * InlineCode component for inline code snippets
 * Used within paragraphs and text content
 */
export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  if (!children) return null;

  return (
    <code className="rounded border border-gray-300 bg-gray-100/80 backdrop-blur-sm px-1.5 py-0.5 font-mono text-xs text-gray-900 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-white">
      {children}
    </code>
  );
};
