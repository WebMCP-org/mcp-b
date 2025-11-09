"use client";
import React from "react";
import { Container } from "../container";
import { Badge } from "../badge";
import { SubHeading } from "../subheading";
import { SectionHeading } from "../seciton-heading";
import { Card, CardDescription, CardTitle } from "./card";
import {
  BrainIcon,
  FingerprintIcon,
  MouseBoxIcon,
  NativeIcon,
  RealtimeSyncIcon,
  SDKIcon,
} from "@/icons/bento-icons";
import {
  LLMModelSelectorSkeleton,
  NativeToolsIntegrationSkeleton,
  TextToWorkflowBuilderSkeleton,
} from "./skeletons";

type Tab = {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  id: string;
};

export const AgenticIntelligence = () => {
  return (
    <Container className="border-divide border-x">
      <div className="flex flex-col items-center py-16">
        <Badge text="Why MCP-B" />
        <SectionHeading className="mt-4">
          Everything you need to run MCP in the browser
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg px-2">
          MCP-B packages the transports, SDKs, and specification work required to expose real product workflows to assistants—using the browser session you already trust.
        </SubHeading>
        <div className="border-divide divide-divide mt-16 grid grid-cols-1 divide-y border-y md:grid-cols-2 md:divide-x">
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <BrainIcon />
              <CardTitle>Extension + Tab transports</CardTitle>
            </div>
            <CardDescription>
              Bridge Claude Desktop, Cursor, or any MCP client directly to the code already running in your tab. No localhost tunnels or custom daemons.
            </CardDescription>
            <LLMModelSelectorSkeleton />
          </Card>
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <MouseBoxIcon />
              <CardTitle>Interfaces built for LLMs</CardTitle>
            </div>
            <CardDescription>
              Document schemas, tool hints, and UI state so assistants know what can be executed—no brittle scraping or heuristics.
            </CardDescription>
            <TextToWorkflowBuilderSkeleton />
          </Card>
        </div>
        <div className="w-full">
          <Card className="relative w-full max-w-none overflow-hidden">
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(var(--color-dots)_1px,transparent_1px)] mask-radial-from-10% [background-size:10px_10px]"></div>
            <div className="flex items-center gap-2">
              <NativeIcon />
              <CardTitle>navigator.modelContext + SDKs</CardTitle>
            </div>
            <CardDescription>
              Polyfills for <code>navigator.modelContext</code>, React hooks, and helpers for exposing tools/resources directly from your existing UI components.
            </CardDescription>
            <NativeToolsIntegrationSkeleton />
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <Card>
            <div className="flex items-center gap-2">
              <FingerprintIcon />
              <CardTitle>User-scoped security</CardTitle>
            </div>
            <CardDescription>
              Tools execute inside the signed-in tab, inheriting cookies, CSRF protections, and audit trails your team already enforces.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <RealtimeSyncIcon />
              <CardTitle>One protocol, many assistants</CardTitle>
            </div>
            <CardDescription>
              Any MCP client can connect through the extension, so you integrate once and reach every assistant that speaks MCP.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <SDKIcon />
              <CardTitle>Ecosystem partnerships</CardTitle>
            </div>
            <CardDescription>
              Built alongside browser vendors, enterprise pilots, and the MCP spec community to stay aligned with emerging standards.
            </CardDescription>
          </Card>
        </div>
      </div>
    </Container>
  );
};
