"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Copy and check icons
const CopyIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// Language extension to display name mapping
const getLanguageDisplay = (language: string): string => {
  const languageMap: Record<string, string> = {
    typescript: "TypeScript",
    javascript: "JavaScript",
    bash: "Bash",
    html: "HTML",
    css: "CSS",
    json: "JSON",
    tsx: "TSX",
    jsx: "JSX",
    python: "Python",
    sql: "SQL",
    yaml: "YAML",
  };
  return languageMap[language] || language;
};

// Get file extension for language
const getFileExtension = (language: string): string => {
  const extensionMap: Record<string, string> = {
    typescript: "ts",
    javascript: "js",
    bash: "sh",
    html: "html",
    css: "css",
    json: "json",
    tsx: "tsx",
    jsx: "jsx",
    python: "py",
    sql: "sql",
    yaml: "yml",
  };
  return extensionMap[language] || language;
};

interface CodeBlockProps {
  children?: string;
  className?: string;
  filename?: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className,
  filename,
  language: explicitLanguage,
}) => {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-typescript")
  const languageFromClass = className?.replace(/language-/, "") || "text";
  const language = explicitLanguage || languageFromClass;

  // Get the code content
  const code = children?.trim() || "";

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Determine the display filename
  const displayFilename = filename || `code.${getFileExtension(language)}`;

  return (
    <div className="my-6 overflow-hidden border border-neutral-800 bg-charcoal-900 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 bg-black px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
          <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
          <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
          <span className="ml-4 font-mono text-xs text-neutral-500">
            {displayFilename}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs font-medium text-neutral-400 transition-colors hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
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

      {/* Code */}
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

// Inline code component for MDX
export const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="bg-neutral-900 px-1.5 py-0.5 font-mono text-xs text-white rounded">
    {children}
  </code>
);
