"use client";
import React from "react";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";
import { Button } from "./button";
import Link from "next/link";
import { CardSpotlight } from "./ui/card-spotlight";

export const Security = () => {
  const securityFeatures = [
    {
      title: "Same-Origin Policy",
      description:
        "Assistants only touch what your domain already exposes.",
      icon: (
        <svg className="text-brand size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "User Consent",
      description:
        "Extensions must be approved before any tool calls occur.",
      icon: (
        <svg className="text-brand size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: "Transparent Audit",
      description:
        "Every tool execution is logged and attributable per user.",
      icon: (
        <svg className="text-brand size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

  return (
    <Container className="border-divide relative overflow-hidden border-x px-4 py-20 md:px-8">
      <div className="relative flex flex-col items-center">
        <Badge text="Built on Browser Security" />
        <SectionHeading className="mt-4">
          Security that inherits from the browser
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg">
          MCP-B runs alongside your production UI, so every tool call is
          protected by the same cookies, MFA, and sandbox rules as the tab
          itself. Nothing new to harden, no tokens leave the user's machine.
        </SubHeading>

        <Button
          className="mt-6"
          as={Link}
          href="https://chromewebstore.google.com/detail/mcp-b-extension/daohopfhkdelnpemnhlekblhnikhdhfa"
        >
          Get Started
        </Button>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {securityFeatures.map((feature) => (
          <SecurityCard key={feature.title} {...feature} />
        ))}
      </div>
    </Container>
  );
};

const SecurityCard = (props: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  const { title, description, icon } = props;
  return (
    <CardSpotlight className="h-full">
      <div className="flex items-center gap-2">{icon}</div>
      <p className="relative z-20 mt-4 mb-2 text-xl font-bold text-neutral-800 dark:text-white">
        {title}
      </p>
      <p className="relative z-20 text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </CardSpotlight>
  );
};
