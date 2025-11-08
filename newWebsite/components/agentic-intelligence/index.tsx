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
        <Badge text="Our Story" />
        <SectionHeading className="mt-4">
          From Blog Post to W3C Standard
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg px-2">
          MCP-B (Model Context Protocol for the Browser) brings Anthropic's Model Context Protocol to web browsers. Our blog post introducing this approach inspired the WebMCP W3C standardization initiative. We're building the production-ready implementation that makes it real.
        </SubHeading>
        <div className="border-divide divide-divide mt-16 grid grid-cols-1 divide-y border-y md:grid-cols-2 md:divide-x">
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <BrainIcon />
              <CardTitle>Blog Post → WebMCP Standard</CardTitle>
            </div>
            <CardDescription>
              Our blog post introducing MCP-B (Model Context Protocol for the Browser) sparked the WebMCP W3C standardization effort. What started as our implementation became the inspiration for an industry-wide standard.
            </CardDescription>
            <LLMModelSelectorSkeleton />
          </Card>
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <MouseBoxIcon />
              <CardTitle>MCP in the Browser</CardTitle>
            </div>
            <CardDescription>
              MCP-B adapts Anthropic's Model Context Protocol for browser environments. Instead of UI automation, AI agents call structured JavaScript functions—deterministic, fast, and reliable.
            </CardDescription>
            <TextToWorkflowBuilderSkeleton />
          </Card>
        </div>
        <div className="w-full">
          <Card className="relative w-full max-w-none overflow-hidden">
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(var(--color-dots)_1px,transparent_1px)] mask-radial-from-10% [background-size:10px_10px]"></div>
            <div className="flex items-center gap-2">
              <NativeIcon />
              <CardTitle>Production-Ready Implementation</CardTitle>
            </div>
            <CardDescription>
              The MCP-B Chrome extension and SDK bring this protocol to life. Deploy AI-accessible websites with ~50 lines of code. Battle-tested at JPMorgan and Adobe in production environments.
            </CardDescription>
            <NativeToolsIntegrationSkeleton />
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <Card>
            <div className="flex items-center gap-2">
              <FingerprintIcon />
              <CardTitle>Open Source</CardTitle>
            </div>
            <CardDescription>
              MCP-B is fully open source. Built transparently with the community. The code that inspired a W3C standard is available for everyone to use, study, and contribute to.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <RealtimeSyncIcon />
              <CardTitle>Enterprise Scale</CardTitle>
            </div>
            <CardDescription>
              Deployed in production at JPMorgan and Adobe. Proven at enterprise scale with Fortune 500 security, compliance, and performance requirements.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <SDKIcon />
              <CardTitle>MCP Compatible</CardTitle>
            </div>
            <CardDescription>
              Full compatibility with Anthropic's Model Context Protocol. Tools you define with MCP-B work across all MCP clients—Claude, custom agents, and more.
            </CardDescription>
          </Card>
        </div>
      </div>
    </Container>
  );
};
