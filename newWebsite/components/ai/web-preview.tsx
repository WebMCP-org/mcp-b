"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefreshCw, Loader2 } from "lucide-react";

// Context for sharing state between subcomponents
interface WebPreviewContextValue {
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const WebPreviewContext = React.createContext<
  WebPreviewContextValue | undefined
>(undefined);

function useWebPreview() {
  const context = React.useContext(WebPreviewContext);
  if (!context) {
    throw new Error("WebPreview components must be used within WebPreview");
  }
  return context;
}

// Main container component
interface WebPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string;
  onUrlChange?: (url: string) => void;
}

export function WebPreview({
  defaultUrl = "",
  onUrlChange,
  className,
  children,
  ...props
}: WebPreviewProps) {
  const [url, setUrl] = React.useState(defaultUrl);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (onUrlChange) {
      onUrlChange(url);
    }
  }, [url, onUrlChange]);

  const value = React.useMemo(
    () => ({ url, setUrl, isLoading, setIsLoading }),
    [url, isLoading]
  );

  return (
    <WebPreviewContext.Provider value={value}>
      <div
        className={cn(
          "flex flex-col h-full overflow-hidden bg-white dark:bg-neutral-900",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </WebPreviewContext.Provider>
  );
}

// Navigation bar container
interface WebPreviewNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function WebPreviewNavigation({
  className,
  children,
  ...props
}: WebPreviewNavigationProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 border-b border-border bg-background",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Navigation button with tooltip
interface WebPreviewNavigationButtonProps
  extends React.ComponentProps<typeof Button> {
  tooltip: string;
}

export function WebPreviewNavigationButton({
  tooltip,
  className,
  children,
  ...props
}: WebPreviewNavigationButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            className={cn(
              "h-8 w-8 p-0 rounded-md text-charcoal-700 dark:text-neutral-100",
              className
            )}
            {...props}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// URL input field
interface WebPreviewUrlProps extends React.ComponentProps<typeof Input> {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export function WebPreviewUrl({
  value: externalValue,
  onChange: externalOnChange,
  onKeyDown: externalOnKeyDown,
  className,
  ...props
}: WebPreviewUrlProps) {
  const { url, setUrl } = useWebPreview();
  const [inputValue, setInputValue] = React.useState(url);

  React.useEffect(() => {
    setInputValue(url);
  }, [url]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    externalOnChange?.(e);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setUrl(inputValue);
    }
    externalOnKeyDown?.(e);
  };

  const handleRefresh = () => {
    setUrl(inputValue);
  };

  return (
    <div className="flex-1 flex items-center gap-2">
      <Input
        type="text"
        value={externalValue ?? inputValue}
        onChange={externalOnChange ?? handleChange}
        onKeyDown={externalOnKeyDown ?? handleKeyDown}
        placeholder="Enter URL..."
        className={cn("h-8 text-sm", className)}
        {...props}
      />
      <WebPreviewNavigationButton
        tooltip="Refresh"
        onClick={handleRefresh}
        type="button"
      >
        <RefreshCw className="h-4 w-4" />
      </WebPreviewNavigationButton>
    </div>
  );
}

// Iframe container
interface WebPreviewBodyProps
  extends Omit<React.IframeHTMLAttributes<HTMLIFrameElement>, 'loading'> {
  src?: string;
  loadingIndicator?: React.ReactNode;
  iframeRef?: React.RefObject<HTMLIFrameElement>;
}

export const WebPreviewBody = React.forwardRef<
  HTMLIFrameElement,
  WebPreviewBodyProps
>(({ src: externalSrc, loadingIndicator, className, iframeRef, ...props }, ref) => {
  const { url, isLoading, setIsLoading } = useWebPreview();
  const [key, setKey] = React.useState(0);

  const iframeSrc = externalSrc ?? url;

  React.useEffect(() => {
    if (iframeSrc) {
      setIsLoading(true);
      // Force iframe refresh when URL changes
      setKey((prev) => prev + 1);
    }
  }, [iframeSrc, setIsLoading]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative flex-1 overflow-hidden bg-white dark:bg-neutral-950">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-neutral-950 z-10">
          {loadingIndicator || (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-neutral-400" />
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                Loading preview...
              </p>
            </div>
          )}
        </div>
      )}
      {iframeSrc && (
        <iframe
          key={key}
          ref={ref || iframeRef}
          src={iframeSrc}
          onLoad={handleLoad}
          className={cn("w-full h-full border-0", className)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          {...props}
        />
      )}
    </div>
  );
});

WebPreviewBody.displayName = "WebPreviewBody";

// Console component (optional)
interface ConsoleLog {
  level: "log" | "warn" | "error" | "info";
  message: string;
  timestamp: number;
}

interface WebPreviewConsoleProps extends React.HTMLAttributes<HTMLDivElement> {
  logs?: ConsoleLog[];
}

export function WebPreviewConsole({
  logs = [],
  className,
  ...props
}: WebPreviewConsoleProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className={cn("border-t border-divide bg-gray-50 dark:bg-neutral-800", className)}
      {...props}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left text-sm font-medium flex items-center justify-between hover:bg-gray-200 dark:hover:bg-neutral-700 transition duration-150 text-charcoal-700 dark:text-neutral-100"
      >
        <span>Console ({logs.length})</span>
        <span className="text-xs">{isOpen ? "▼" : "▶"}</span>
      </button>
      {isOpen && (
        <div className="max-h-48 overflow-y-auto border-t border-divide">
          {logs.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-600 dark:text-neutral-400">
              No console output
            </div>
          ) : (
            logs.map((log, idx) => (
              <div
                key={idx}
                className={cn(
                  "px-4 py-1 text-xs font-mono border-b border-divide last:border-0",
                  log.level === "error"
                    ? "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400"
                    : log.level === "warn"
                    ? "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400"
                    : "text-charcoal-700 dark:text-neutral-300"
                )}
              >
                <span className="text-gray-500 dark:text-neutral-500 mr-2">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span className="font-bold mr-2">[{log.level}]</span>
                {log.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
