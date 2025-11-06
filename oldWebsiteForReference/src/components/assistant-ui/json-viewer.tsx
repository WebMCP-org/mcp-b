import JsonView from '@uiw/react-json-view';
import { darkTheme } from '@uiw/react-json-view/dark';
import { lightTheme } from '@uiw/react-json-view/light';
import { useEffect, useMemo, useState } from 'react';

import type { JsonValue } from '../McpServer/types';
import { cn } from '../../lib/utils';

const COMMON_THEME_OVERRIDES: Record<string, string> = {
  '--w-rjv-background-color': 'transparent',
  '--w-rjv-font-family':
    "'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  '--w-rjv-line-color': 'hsl(var(--border) / 0.35)',
  '--w-rjv-arrow-color': 'hsl(var(--muted-foreground))',
  '--w-rjv-copied-color': 'hsl(var(--primary))',
  '--w-rjv-ellipsis-color': '#fb923c',
};

const LIGHT_THEME_OVERRIDES: Record<string, string> = {
  '--w-rjv-color': 'hsl(var(--muted-foreground))',
  '--w-rjv-key-string': 'hsl(var(--foreground))',
  '--w-rjv-key-number': 'hsl(var(--foreground))',
  '--w-rjv-quotes-color': 'hsl(var(--muted-foreground))',
  '--w-rjv-type-string-color': '#047857',
  '--w-rjv-type-int-color': '#2563eb',
  '--w-rjv-type-float-color': '#2563eb',
  '--w-rjv-type-boolean-color': '#7c3aed',
  '--w-rjv-type-null-color': '#0ea5e9',
  '--w-rjv-type-undefined-color': '#0891b2',
  '--w-rjv-type-date-color': '#1d4ed8',
  '--w-rjv-type-url-color': '#1d4ed8',
};

const DARK_THEME_OVERRIDES: Record<string, string> = {
  '--w-rjv-color': 'hsl(var(--muted-foreground))',
  '--w-rjv-key-string': 'hsl(var(--foreground))',
  '--w-rjv-key-number': 'hsl(var(--foreground))',
  '--w-rjv-quotes-color': 'hsl(var(--muted-foreground))',
  '--w-rjv-type-string-color': '#34d399',
  '--w-rjv-type-int-color': '#60a5fa',
  '--w-rjv-type-float-color': '#60a5fa',
  '--w-rjv-type-boolean-color': '#c084fc',
  '--w-rjv-type-null-color': '#38bdf8',
  '--w-rjv-type-undefined-color': '#38bdf8',
  '--w-rjv-type-date-color': '#60a5fa',
  '--w-rjv-type-url-color': '#60a5fa',
};

export const sanitizeForJson = (input: unknown, depth = 0, maxDepth = 8): JsonValue => {
  if (depth > maxDepth) {
    return '[depth-limit]' as JsonValue;
  }

  if (input === null || input === undefined) {
    return input as null | undefined;
  }

  if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    return input;
  }

  if (input instanceof Date) {
    return input.toISOString();
  }

  if (input instanceof Map) {
    return Array.from(input.entries()).reduce<Record<string, JsonValue>>((acc, [key, value]) => {
      acc[String(key)] = sanitizeForJson(value, depth + 1, maxDepth);
      return acc;
    }, {});
  }

  if (input instanceof Set) {
    return Array.from(input).map((value) => sanitizeForJson(value, depth + 1, maxDepth));
  }

  if (Array.isArray(input)) {
    return input.map((value) => sanitizeForJson(value, depth + 1, maxDepth));
  }

  if (input instanceof Error) {
    return {
      name: input.name,
      message: input.message,
      stack: input.stack ? input.stack.split('\n').slice(0, 5).join('\n') : undefined,
    } as Record<string, JsonValue>;
  }

  if (typeof input === 'function') {
    return `[Function ${input.name || 'anonymous'}]`;
  }

  if (typeof input === 'symbol') {
    return input.toString();
  }

  if (typeof input === 'object') {
    return Object.entries(input as Record<string, unknown>).reduce<Record<string, JsonValue>>(
      (acc, [key, value]) => {
        acc[key] = sanitizeForJson(value, depth + 1, maxDepth);
        return acc;
      },
      {}
    );
  }

  return String(input);
};

export interface JsonViewerProps {
  value: unknown;
  collapsed?: boolean | number;
  className?: string;
}

export const JsonViewer = ({ value, collapsed = 1, className }: JsonViewerProps) => {
  // Use stable memoization to prevent infinite re-renders
  const sanitized = useMemo(() => {
    try {
      return sanitizeForJson(value);
    } catch (error) {
      console.error('JsonViewer sanitization error:', error);
      return null;
    }
  }, [value]);

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const root = document.documentElement;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
    return root.classList.contains('dark') || prefersDark;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      setIsDark(root.classList.contains('dark') || media.matches);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', updateTheme);
    } else {
      media.addListener(updateTheme);
    }

    return () => {
      observer.disconnect();
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', updateTheme);
      } else {
        media.removeListener(updateTheme);
      }
    };
  }, []);

  if (sanitized === undefined) {
    return <p className="text-xs text-muted-foreground">No data available.</p>;
  }

  if (sanitized === null || typeof sanitized !== 'object') {
    return (
      <code
        className={cn(
          'whitespace-pre-wrap break-words font-mono text-xs text-foreground',
          className
        )}
      >
        {typeof sanitized === 'string' ? sanitized : String(sanitized)}
      </code>
    );
  }

  const jsonTheme = useMemo(
    () => ({
      ...(isDark ? darkTheme : lightTheme),
      ...COMMON_THEME_OVERRIDES,
      ...(isDark ? DARK_THEME_OVERRIDES : LIGHT_THEME_OVERRIDES),
    }),
    [isDark]
  );

  return (
    <div className={cn('text-xs text-foreground', className)}>
      <JsonView
        value={sanitized as object}
        style={jsonTheme}
        enableClipboard={false}
        displayDataTypes={false}
        collapsed={collapsed}
        shortenTextAfterLength={160}
        highlightUpdates={false}
      />
    </div>
  );
};

JsonViewer.displayName = 'JsonViewer';
