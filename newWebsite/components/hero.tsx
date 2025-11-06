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
        Foundational Primitives <br /> for{" "}
        <span className="text-brand">Agentic Browsers</span>
      </Heading>

      <SubHeading className="mx-auto mt-6 max-w-lg">
        While others build products, we're building the primitives. Working with web standards bodies and browser vendors to create the foundational layer for AI-native browsers. Building UIs for LLMs, not just interfaces with LLMs.
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
