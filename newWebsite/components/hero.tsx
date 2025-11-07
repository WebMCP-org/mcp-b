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
      <Badge text="Browser-Native MCP" />
      <Heading className="mt-4">
        Model Context Protocol <br /> for{" "}
        <span className="text-brand">the Browser</span>
      </Heading>

      <SubHeading className="mx-auto mt-6 max-w-lg">
        Today's AI automation is like using a robot to read your screen and click buttons. MCP-B lets assistants call your site's real functions instead.
      </SubHeading>

      <div className="mt-6 flex items-center gap-4">
        <Button as={Link} href="https://chromewebstore.google.com/detail/mcp-b/daohopfhkdelnpemnhlekblhnikhdhfa">
          Add to Chrome
        </Button>
        <Button variant="secondary" as={Link} href="/mcp-b-playground">
          Try the live demo
        </Button>
      </div>
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        No API keys or OAuth — uses your logged-in session
      </p>
    </Container>
  );
};
