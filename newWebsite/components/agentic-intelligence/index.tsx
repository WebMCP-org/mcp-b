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
        <Badge text="Our Mission" />
        <SectionHeading className="mt-4">
          Building the Foundation for Agentic Browsers
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg px-2">
          We're not building another AI product. We're creating the protocol-level primitives that enable the next generation of AI-native web experiences.
        </SubHeading>
        <div className="border-divide divide-divide mt-16 grid grid-cols-1 divide-y border-y md:grid-cols-2 md:divide-x">
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <BrainIcon />
              <CardTitle>W3C Web Standards</CardTitle>
            </div>
            <CardDescription>
              Working with web standards bodies to define the protocols browsers will use to communicate with AI agents. Building tomorrow's standards today.
            </CardDescription>
            <LLMModelSelectorSkeleton />
          </Card>
          <Card className="overflow-hidden mask-b-from-80%">
            <div className="flex items-center gap-2">
              <MouseBoxIcon />
              <CardTitle>UIs for LLMs</CardTitle>
            </div>
            <CardDescription>
              Pioneering new patterns for building user interfaces that AI agents can understand and interact with. Creating the design primitives for the agentic web.
            </CardDescription>
            <TextToWorkflowBuilderSkeleton />
          </Card>
        </div>
        <div className="w-full">
          <Card className="relative w-full max-w-none overflow-hidden">
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(var(--color-dots)_1px,transparent_1px)] mask-radial-from-10% [background-size:10px_10px]"></div>
            <div className="flex items-center gap-2">
              <NativeIcon />
              <CardTitle>Browser-Native Primitives</CardTitle>
            </div>
            <CardDescription>
              Creating the low-level APIs that browsers need to be truly agentic. Working directly with browser vendors on the infrastructure layer that powers AI-native experiences.
            </CardDescription>
            <NativeToolsIntegrationSkeleton />
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <Card>
            <div className="flex items-center gap-2">
              <FingerprintIcon />
              <CardTitle>Open Source Foundation</CardTitle>
            </div>
            <CardDescription>
              Built in the open with transparent development. Creating standards and primitives that everyone can build on top of, not proprietary walled gardens.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <RealtimeSyncIcon />
              <CardTitle>Protocol-First Design</CardTitle>
            </div>
            <CardDescription>
              Focused on creating robust, extensible protocols that will stand the test of time. Building the infrastructure layer for the next decade of web experiences.
            </CardDescription>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <SDKIcon />
              <CardTitle>Vendor Collaboration</CardTitle>
            </div>
            <CardDescription>
              Partnering with browser vendors, web standards groups, and the broader ecosystem to ensure our primitives become the foundation others build on.
            </CardDescription>
          </Card>
        </div>
      </div>
    </Container>
  );
};
