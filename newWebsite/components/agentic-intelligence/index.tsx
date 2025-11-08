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
        <Badge text="Our Story & Mission" />
        <SectionHeading className="mt-4">
          From Vision to W3C Standard
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg px-2">
          MCP-B pioneered the concept of browser-native AI protocols. Our original research and blog post inspired the WebMCP W3C standardization effort. Now we're building the reference implementation and foundational primitives that bring this vision to life.
        </SubHeading>
        <div className="border-divide divide-divide mt-16 grid grid-cols-1 divide-y border-y md:grid-cols-2 md:divide-x">
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <BrainIcon />
              <CardTitle>Inspired the Standard</CardTitle>
            </div>
            <CardDescription>
              Our pioneering work on browser-native AI protocols inspired the WebMCP W3C standardization initiative. We're now actively collaborating with standards bodies to define how browsers and AI agents communicate.
            </CardDescription>
            <LLMModelSelectorSkeleton />
          </Card>
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <MouseBoxIcon />
              <CardTitle>Protocol-First Innovation</CardTitle>
            </div>
            <CardDescription>
              Moving beyond UI automation to structured tool calling. We invented the patterns that enable AI agents to interact with websites through deterministic APIs instead of probabilistic screen parsing.
            </CardDescription>
            <TextToWorkflowBuilderSkeleton />
          </Card>
        </div>
        <div className="w-full">
          <Card className="relative w-full max-w-none overflow-hidden">
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(var(--color-dots)_1px,transparent_1px)] mask-radial-from-10% [background-size:10px_10px]"></div>
            <div className="flex items-center gap-2">
              <NativeIcon />
              <CardTitle>Reference Implementation</CardTitle>
            </div>
            <CardDescription>
              Building the production-grade implementation of our vision. The MCP-B extension and SDK demonstrate how browser-native AI protocols work in practice, validated by JPMorgan and Adobe deployments.
            </CardDescription>
            <NativeToolsIntegrationSkeleton />
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <Card>
            <div className="flex items-center gap-2">
              <FingerprintIcon />
              <CardTitle>Thought Leadership</CardTitle>
            </div>
            <CardDescription>
              From blog post to W3C standard. Our research and vision-setting continue to guide the evolution of browser-AI interaction patterns across the industry.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <RealtimeSyncIcon />
              <CardTitle>Enterprise-Proven</CardTitle>
            </div>
            <CardDescription>
              Trusted by Fortune 500 companies for production AI agent deployments. Our primitives are battle-tested at scale with JPMorgan's and Adobe's most demanding use cases.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <SDKIcon />
              <CardTitle>Ecosystem Builder</CardTitle>
            </div>
            <CardDescription>
              Enabling the next generation of AI-native applications. Our open-source tools and standards work create the foundation that thousands of products will build upon.
            </CardDescription>
          </Card>
        </div>
      </div>
    </Container>
  );
};
