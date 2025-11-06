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
        <Badge text="Features" />
        <SectionHeading className="mt-4">
          Everything You Need for AI Integration
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg px-2">
          From React hooks to Chrome Extension APIs, MCP-B provides the complete toolkit to make your website AI-accessible
        </SubHeading>
        <div className="border-divide divide-divide mt-16 grid grid-cols-1 divide-y border-y md:grid-cols-2 md:divide-x">
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <BrainIcon />
              <CardTitle>On-Device & Cloud Models</CardTitle>
            </div>
            <CardDescription>
              Select from both on-device and cloud models. We support almost all models including Chrome's built-in AI for privacy-first, offline-capable AI interactions.
            </CardDescription>
            <LLMModelSelectorSkeleton />
          </Card>
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <MouseBoxIcon />
              <CardTitle>TypeScript SDK</CardTitle>
            </div>
            <CardDescription>
              Full type safety with @mcp-b/webmcp-ts-sdk. Browser-adapted MCP implementation with tab and extension transports built in.
            </CardDescription>
            <TextToWorkflowBuilderSkeleton />
          </Card>
        </div>
        <div className="w-full">
          <Card className="relative w-full max-w-none overflow-hidden">
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(var(--color-dots)_1px,transparent_1px)] mask-radial-from-10% [background-size:10px_10px]"></div>
            <div className="flex items-center gap-2">
              <NativeIcon />
              <CardTitle>62+ Chrome Extension APIs</CardTitle>
            </div>
            <CardDescription>
              @mcp-b/extension-tools wraps Chrome Extension APIs as MCP tools. Control tabs, bookmarks, history, downloads, and more through AI agents.
            </CardDescription>
            <NativeToolsIntegrationSkeleton />
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <Card>
            <div className="flex items-center gap-2">
              <FingerprintIcon />
              <CardTitle>Session-Based Auth</CardTitle>
            </div>
            <CardDescription>
              Uses existing browser authentication automatically. No OAuth flows, no API keys to manage or rotate, no new security surface.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <RealtimeSyncIcon />
              <CardTitle>Dynamic Tool Updates</CardTitle>
            </div>
            <CardDescription>
              Register tools asynchronously and update them based on app state. Extension caches tools for performance.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <SDKIcon />
              <CardTitle>Framework Agnostic</CardTitle>
            </div>
            <CardDescription>
              Works with React, Vue, Svelte, or vanilla JavaScript. Integrates with Assistant-UI, AG-UI, and custom runtimes.
            </CardDescription>
          </Card>
        </div>
      </div>
    </Container>
  );
};
