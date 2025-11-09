'use client'

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Check, Copy } from 'lucide-react';
import { Button } from './ui/button';

interface MDXCodeBlockProps {
  code: string;
  language: string;
}

/**
 * CodeBlock component for MDX blog posts
 * Accepts code and language props (unlike the standard code block which uses children)
 */
export function MDXCodeBlock({ code, language }: MDXCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <div className="relative group not-prose my-6">
      <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          onClick={handleCopy}
          size="sm"
          variant="ghost"
          className="h-8 px-2 text-xs bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="overflow-hidden rounded-lg border border-zinc-800">
        <div className="flex items-center justify-between bg-zinc-900 px-4 py-2 text-xs text-zinc-400">
          <span className="font-mono">{language}</span>
        </div>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#1e1e1e',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          codeTagProps={{
            style: {
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
