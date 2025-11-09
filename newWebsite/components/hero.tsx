"use client";
import React from "react";
import { Container } from "./container";
import { Heading } from "./heading";
import { SubHeading } from "./subheading";
import { Button } from "./button";
import { Badge } from "./badge";
import Link from "next/link";

export const Hero = () => {
  return (
    <Container className="border-divide flex flex-col items-center justify-center border-x px-4 pt-10 pb-10 md:pt-32 md:pb-20">
      <Badge text="Model Context Protocol for Browsers" />
      <Heading className="mt-4">
        Turn your website into an MCP server <br /> with{" "}
        <span className="text-brand">MCP-B</span>
      </Heading>

      <SubHeading className="mx-auto mt-6 max-w-lg">
        Register tools with <code>navigator.modelContext</code>, reuse the user's existing session, and let the MCP-B Chrome extension expose everything to Claude, Cursor, or any assistant that speaks MCP—no new backend, no brittle UI automation.
      </SubHeading>

      <div className="mt-6 flex items-center gap-4">
        <Button as={Link} href="https://chromewebstore.google.com/detail/mcp-b-extension/daohopfhkdelnpemnhlekblhnikhdhfa">
          Add to Chrome
        </Button>
        <Button variant="secondary" as={Link} href="https://mcp-ui.mcp-b.ai">
          Try the live demo
        </Button>
      </div>
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Open Source • navigator.modelContext polyfill • Extension + Tab transports
      </p>
    </Container>
  );
};
