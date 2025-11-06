import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.browserbase.com/v1/sessions/${sessionId}`,
      {
        method: "DELETE",
        headers: {
          "X-BB-API-Key": process.env.BROWSERBASE_API_KEY!,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("End session error:", errorText);
      return NextResponse.json(
        { error: "Failed to end session" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("End session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
