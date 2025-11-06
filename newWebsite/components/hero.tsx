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
      <Badge text="Introducing MCP-B" />
      <Heading className="mt-4">
        Model Context Protocol <br /> for the{" "}
        <span className="text-brand">Browser</span>
      </Heading>

      <SubHeading className="mx-auto mt-6 max-w-lg">
        Stop making AI read screens and guess where buttons are. MCP-B brings the Model Context Protocol to browsers, letting agents call your website's real functions using existing sessions. ~50 lines of code. Zero configuration. No API keys.
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
