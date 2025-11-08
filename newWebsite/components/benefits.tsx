"use client";
import React from "react";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";
import {
  RocketIcon,
  ShieldIcon,
} from "@/icons/card-icons";
import { RealtimeSyncIcon } from "@/icons/bento-icons";

export const Benefits = () => {
  const benefits = [
    {
      title: "10,000x Faster Than Screen Scraping",
      description:
        "Execute tasks in milliseconds instead of 10-20 seconds. Direct API calls eliminate UI parsing and multiple LLM invocations. Save $4-5 per action in API costs.",
      icon: <RocketIcon className="text-brand size-6" />,
    },
    {
      title: "No Authentication Setup Required",
      description:
        "Uses existing browser sessions automatically. No OAuth flows, no API keys to manage, no additional security implementation needed. Works instantly with your current login.",
      icon: <ShieldIcon className="text-brand size-6" />,
    },
    {
      title: "~50 Lines of Code to Integrate",
      description:
        "Add MCP capabilities to your website in minutes, not days. Define your tools once and they work with all MCP-compatible AI assistants. Framework agnostic.",
      icon: <RealtimeSyncIcon className="text-brand size-6" />,
    },
  ];
  return (
    <Container className="border-divide relative overflow-hidden border-x px-4 py-20 md:px-8">
      <div className="relative flex flex-col items-center">
        <Badge text="Why MCP-B" />
        <SectionHeading className="mt-4">
          The Fastest Path to AI-Ready
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg">
          Built on web standards and browser security primitives. No complex infrastructure, no API management, no authentication headaches.
        </SubHeading>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Card key={benefit.title} {...benefit} />
        ))}
      </div>
    </Container>
  );
};

const Card = (props: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  const { title, description, icon } = props;
  return (
    <div className="relative z-10 rounded-lg bg-gray-50 p-4 transition duration-200 hover:bg-transparent md:p-5 dark:bg-neutral-800">
      <div className="flex items-center gap-2">{icon}</div>
      <h3 className="mt-4 mb-2 text-lg font-medium">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
