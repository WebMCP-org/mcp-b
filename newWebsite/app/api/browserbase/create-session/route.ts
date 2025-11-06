import { NextRequest, NextResponse } from "next/server";

// Types for Browserbase API
interface CreateSessionRequest {
  projectId: string;
  extensionId: string;
  region?: string;
  browserSettings?: {
    recordSession?: boolean;
    logSession?: boolean;
  };
  keepAlive?: boolean;
  timeout?: number;
}

interface BrowserbaseSession {
  id: string;
  status: string;
  createdAt: string;
}

interface DebugResponse {
  debuggerFullscreenUrl: string;
  debuggerUrl: string;
  pages: Array<{
    id: string;
    url: string;
    debuggerFullscreenUrl: string;
  }>;
}

export async function POST(req: NextRequest) {
  try {
    // Optional: Verify Turnstile token
    const body = await req.json();
    const { turnstileToken } = body;

    if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const formData = new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      });

      const verifyResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const verifyResult = await verifyResponse.json();

      if (!verifyResult.success) {
        return NextResponse.json(
          { error: "Turnstile verification failed" },
          { status: 400 }
        );
      }
    }

    // Create Browserbase session
    const createPayload: CreateSessionRequest = {
      projectId: process.env.BROWSERBASE_PROJECT_ID!,
      extensionId: process.env.BROWSERBASE_EXTENSION_ID!,
      region: process.env.BB_REGION || "us-east-1",
      browserSettings: {
        recordSession: false, // Privacy: don't record user interactions
        logSession: false,
      },
      keepAlive: false, // End session when user leaves
      timeout: 900, // 15 minutes max
    };

    const createResponse = await fetch(
      "https://api.browserbase.com/v1/sessions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-BB-API-Key": process.env.BROWSERBASE_API_KEY!,
        },
        body: JSON.stringify(createPayload),
      }
    );

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error("Browserbase create session error:", errorText);
      return NextResponse.json(
        { error: "Failed to create browser session" },
        { status: 502 }
      );
    }

    const session: BrowserbaseSession = await createResponse.json();

    // Get Live View URL
    const debugResponse = await fetch(
      `https://api.browserbase.com/v1/sessions/${session.id}/debug`,
      {
        headers: {
          "X-BB-API-Key": process.env.BROWSERBASE_API_KEY!,
        },
      }
    );

    if (!debugResponse.ok) {
      const errorText = await debugResponse.text();
      console.error("Browserbase debug URL error:", errorText);
      return NextResponse.json(
        { error: "Failed to get live view URL" },
        { status: 502 }
      );
    }

    const debugData: DebugResponse = await debugResponse.json();

    // Add navbar=false for cleaner embed
    const liveViewUrl = `${debugData.debuggerFullscreenUrl}&navbar=false`;

    return NextResponse.json({
      sessionId: session.id,
      liveViewUrl,
      status: session.status,
    });
  } catch (error) {
    console.error("Create session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
