"use client";

import { useRef, useState, useEffect } from "react";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";
import { Monitor, Play, Hand, Eye } from "lucide-react";

type DemoState = "idle" | "loading" | "ready" | "error";

export const LiveBrowserDemo = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState<DemoState>("idle");
  const [interactive, setInteractive] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  async function startSession() {
    setState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/browserbase/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          turnstileToken: turnstileToken || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to start session");
      }

      const data = await response.json();

      setSessionId(data.sessionId);

      if (frameRef.current) {
        frameRef.current.src = data.liveViewUrl;
        frameRef.current.style.pointerEvents = "none"; // Start read-only
        frameRef.current.hidden = false;
      }

      setState("ready");
    } catch (error) {
      console.error("Failed to start session:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to start session"
      );
      setState("error");
    }
  }

  function toggleInteractive() {
    if (!frameRef.current) return;

    const newInteractive = !interactive;
    frameRef.current.style.pointerEvents = newInteractive ? "auto" : "none";
    setInteractive(newInteractive);
  }

  async function endSession() {
    if (!sessionId) return;

    try {
      await fetch("/api/browserbase/end-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });
    } catch (error) {
      console.error("Failed to end session:", error);
    } finally {
      if (frameRef.current) {
        frameRef.current.src = "";
        frameRef.current.hidden = true;
      }
      setSessionId(null);
      setState("idle");
      setInteractive(false);
    }
  }

  // Listen for Browserbase disconnect
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "browserbase-disconnected") {
        console.warn("Live view disconnected");
        setState("error");
        setErrorMessage("Session disconnected. Please start a new session.");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Setup Turnstile callback
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).onTurnstileSuccess = (token: string) => {
        setTurnstileToken(token);
      };
    }
  }, []);

  return (
    <Container className="border-divide border-x py-20">
      <div className="flex flex-col items-center px-4 md:px-8">
        <Badge text="Live Demo" />
        <SectionHeading className="mt-4">
          Try the Extension Live
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-2xl text-center">
          Experience the MCP-B Chrome extension in action. Start a live browser
          session and interact with AI-enabled websites.
        </SubHeading>

        {/* Controls */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {state === "idle" && (
            <button
              onClick={startSession}
              className="inline-flex items-center gap-2 border border-neutral-800 bg-white px-6 py-2.5 text-sm font-medium text-black transition-all hover:bg-neutral-100"
            >
              <Play className="h-4 w-4" />
              Start Live Demo
            </button>
          )}

          {state === "loading" && (
            <div className="inline-flex items-center gap-2 border border-neutral-800 bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Starting session...
            </div>
          )}

          {state === "ready" && (
            <>
              <button
                onClick={toggleInteractive}
                className={`inline-flex items-center gap-2 border px-6 py-2.5 text-sm font-medium transition-all ${
                  interactive
                    ? "border-green-800 bg-green-950 text-green-400 hover:bg-green-900"
                    : "border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                {interactive ? (
                  <>
                    <Hand className="h-4 w-4" />
                    Interactive Mode
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    View-Only Mode
                  </>
                )}
              </button>

              <button
                onClick={endSession}
                className="inline-flex items-center gap-2 border border-red-800 bg-red-950 px-6 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-900"
              >
                End Session
              </button>
            </>
          )}

          {state === "error" && (
            <button
              onClick={startSession}
              className="inline-flex items-center gap-2 border border-neutral-800 bg-white px-6 py-2.5 text-sm font-medium text-black transition-all hover:bg-neutral-100"
            >
              <Play className="h-4 w-4" />
              Try Again
            </button>
          )}
        </div>

        {/* Error Message */}
        {state === "error" && errorMessage && (
          <div className="mt-4 border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-200">
            <strong className="text-red-100">Error:</strong> {errorMessage}
          </div>
        )}

        {/* Browser Frame */}
        <div className="mt-8 w-full max-w-6xl">
          <div className="overflow-hidden border border-neutral-800 bg-charcoal-900 shadow-2xl">
            {/* Browser Chrome */}
            <div className="flex items-center justify-between border-b border-neutral-800 bg-black px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
                <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
                <div className="h-3 w-3 border border-neutral-700 bg-neutral-800"></div>
                <span className="ml-4 flex items-center gap-2 font-mono text-xs text-neutral-500">
                  <Monitor className="h-3.5 w-3.5" />
                  Live Browser Session
                </span>
              </div>
              {state === "ready" && (
                <span className="inline-flex items-center gap-1.5 border border-green-800 bg-green-950 px-2 py-0.5 text-xs font-medium text-green-400">
                  <span className="h-1.5 w-1.5 animate-pulse bg-green-500"></span>
                  LIVE
                </span>
              )}
            </div>

            {/* Iframe Container */}
            <div className="relative aspect-video bg-neutral-900">
              {state === "idle" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <Monitor className="mb-4 h-16 w-16 text-neutral-700" />
                  <p className="text-lg font-medium text-white">
                    Ready to Start
                  </p>
                  <p className="mt-2 text-sm text-neutral-400">
                    Click &quot;Start Live Demo&quot; to launch a browser
                    session
                  </p>
                </div>
              )}

              {state === "loading" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-700 border-t-white"></div>
                  <p className="mt-4 text-sm text-neutral-400">
                    Initializing browser session...
                  </p>
                </div>
              )}

              <iframe
                ref={frameRef}
                hidden={state !== "ready"}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                allow="clipboard-read; clipboard-write"
                className="h-full w-full border-0"
                title="Live Browser Session"
              />
            </div>
          </div>

          {/* Info Cards */}
          {state === "ready" && (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="border border-neutral-800 bg-neutral-900 p-4">
                <h4 className="font-semibold text-white">
                  Extension Pre-loaded
                </h4>
                <p className="mt-2 text-sm text-neutral-400">
                  The MCP-B extension is already installed and active in this
                  browser session.
                </p>
              </div>
              <div className="border border-neutral-800 bg-neutral-900 p-4">
                <h4 className="font-semibold text-white">Safe Sandbox</h4>
                <p className="mt-2 text-sm text-neutral-400">
                  This session is isolated and temporary. No data is stored or
                  tracked.
                </p>
              </div>
              <div className="border border-neutral-800 bg-neutral-900 p-4">
                <h4 className="font-semibold text-white">15 Min Limit</h4>
                <p className="mt-2 text-sm text-neutral-400">
                  Sessions automatically end after 15 minutes of inactivity.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
