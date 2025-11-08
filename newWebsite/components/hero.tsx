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
      <Badge text="Building the Agentic Web" />
      <Heading className="mt-4">
        Turn Any Website Into <br /> an{" "}
        <span className="text-brand">MCP Server</span>
      </Heading>

      <SubHeading className="mx-auto mt-6 max-w-lg">
        Browser-native implementation of the Model Context Protocol. Give AI agents direct access to your web app with ~50 lines of code. No API keys, no OAuth, no complex setup—just uses your existing browser session.
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
        Open Source • W3C-Aligned • Piloted by JPMorgan & Adobe
      </p>
    </Container>
  );
};
