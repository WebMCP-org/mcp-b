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
      <Badge text="Model Context Protocol for the Browser" />
      <Heading className="mt-4">
        Browser-Native AI <br />{" "}
        <span className="text-brand">Protocol That Started It All</span>
      </Heading>

      <SubHeading className="mx-auto mt-6 max-w-lg">
        MCP-B brings the Model Context Protocol to browsers. Our blog post about this approach inspired the WebMCP W3C standardization effort. Now we're building the production implementation that enables AI agents to interact with websites through structured tools, not UI automation.
      </SubHeading>

      <div className="mt-6 flex items-center gap-4">
        <Button as={Link} href="https://chromewebstore.google.com/detail/mcp-b-extension/daohopfhkdelnpemnhlekblhnikhdhfa">
          Get the Extension
        </Button>
        <Button variant="secondary" as={Link} href="https://mcp-ui.mcp-b.ai">
          View Live Demo
        </Button>
      </div>
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Our Blog Post Inspired WebMCP W3C Standard • Deployed at JPMorgan & Adobe
      </p>
    </Container>
  );
};
