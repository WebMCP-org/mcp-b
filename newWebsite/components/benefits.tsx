"use client";
import React, { useEffect, useState } from "react";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";
import {
  RocketIcon,
  GraphIcon,
  ShieldIcon,
  ReuseBrainIcon,
  ScreenCogIcon,
  BellIcon,
} from "@/icons/card-icons";
import { Scale } from "./scale";
import { AnimatePresence, motion } from "motion/react";
import { RealtimeSyncIcon } from "@/icons/bento-icons";
import { DivideX } from "./divide";
import { LogoSVG } from "./logo";
import { OpenAILogo, SlackLogo } from "@/icons/general";
import { IconBlock } from "./common/icon-block";
import { HorizontalLine } from "./common/horizontal-line";
import { VerticalLine } from "./common/vertical-line";

export const Benefits = () => {
  const benefits = [
    {
      title: "Lightning Fast",
      description:
        "Execute tasks in milliseconds instead of 10-20 seconds. Direct API calls eliminate the need for UI parsing and multiple LLM invocations.",
      icon: <RocketIcon className="text-brand size-6" />,
    },
    {
      title: "No Authentication Hassle",
      description:
        "Uses existing browser sessions automatically. No OAuth flows, no API keys to manage, no additional security implementation needed.",
      icon: <ShieldIcon className="text-brand size-6" />,
    },
    {
      title: "Simple Integration",
      description:
        "Add ~50 lines of code to make your website AI-ready. Define your tools once and they work with all MCP-compatible assistants.",
      icon: <RealtimeSyncIcon className="text-brand size-6" />,
    },
    {
      title: "Browser as MCP Server",
      description:
        "Websites can expose tools and resources directly to AI agents through a simple JavaScript API.",
      icon: <ScreenCogIcon className="text-brand size-6" />,
    },
    {
      title: "Secure by Default",
      description:
        "Built on browser security primitives with user consent and transparent audit trails for all operations.",
      icon: <ShieldIcon className="text-brand size-6" />,
    },
    {
      title: "Standards-Based",
      description:
        "Implements Anthropic's Model Context Protocol specification for maximum compatibility with AI assistants.",
      icon: <GraphIcon className="text-brand size-6" />,
    },
  ];
  return (
    <Container className="border-divide relative overflow-hidden border-x px-4 py-20 md:px-8">
      <div className="relative flex flex-col items-center">
        <Badge text="Why Primitives Matter" />
        <SectionHeading className="mt-4">
          Infrastructure for the Next Era
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg">
          By building at the protocol level, we create foundational pieces that enable thousands of products to be built on top. That's the power of primitives.
        </SubHeading>
      </div>
      <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="grid grid-cols-1 gap-4">
          {benefits.slice(0, 3).map((benefit, index) => (
            <Card key={benefit.title} {...benefit} />
          ))}
        </div>
        <MiddleCard />
        <div className="grid grid-cols-1 gap-4">
          {benefits.slice(3, 6).map((benefit, index) => (
            <Card key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </Container>
  );
};

const MiddleCard = () => {
  const texts = ["Meeting created", "Chat history saved", "You talking to me"];
  const [activeText, setActiveText] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveText((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative flex min-h-40 flex-col justify-end overflow-hidden rounded-lg bg-gray-50 p-4 md:p-5 dark:bg-neutral-900">
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-dots)_1px,transparent_1px)] mask-radial-from-10% [background-size:10px_10px] shadow-xl"></div>

      <div className="flex items-center justify-center">
        <IconBlock icon={<OpenAILogo className="size-6" />} />
        <HorizontalLine />
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-200 p-px shadow-xl dark:bg-neutral-700">
          <div className="absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-blue-500)_20%,transparent_30%)] [animation-duration:2s]"></div>
          <div className="via-brand absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-brand)_20%,transparent_30%)] [animation-delay:1s] [animation-duration:2s]"></div>
          <div className="relative z-20 flex h-full w-full items-center justify-center rounded-[5px] bg-white dark:bg-neutral-900">
            <LogoSVG />
          </div>
        </div>
        <HorizontalLine />
        <IconBlock icon={<SlackLogo className="size-6" />} />
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center">
        <VerticalLine />
        <div className="rounded-sm border border-blue-500 bg-blue-50 px-2 py-0.5 text-xs text-blue-500 dark:bg-blue-900 dark:text-white">
          Connected
        </div>
      </div>
      <div className="h-60 w-full translate-x-10 translate-y-10 overflow-hidden rounded-md bg-gray-200 p-px shadow-xl dark:bg-neutral-700">
        <div className="absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic from-transparent via-blue-500 via-20% to-transparent to-30% blur-2xl [animation-duration:4s]"></div>
        <div className="via-brand absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic from-transparent via-20% to-transparent to-30% blur-2xl [animation-delay:2s] [animation-duration:4s]"></div>
        <div className="relative z-20 h-full w-full rounded-[5px] bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between p-4">
            <div className="flex gap-1">
              <div className="size-2 rounded-full bg-red-400"></div>
              <div className="size-2 rounded-full bg-yellow-400"></div>
              <div className="size-2 rounded-full bg-green-400"></div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                className="shadow-aceternity mr-2 flex items-center gap-1 rounded-sm bg-white px-2 py-1 text-xs text-neutral-500 dark:bg-neutral-700 dark:text-white"
                key={activeText}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <BellIcon className="size-3" />
                <motion.span key={activeText}>{texts[activeText]}</motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
          <DivideX />
          <div className="flex h-full flex-row">
            <div className="h-full w-14 bg-gray-200 dark:bg-neutral-800" />
            <motion.div className="w-full gap-y-4 p-4">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-neutral-300">
                Dashboard
              </h2>

              <div className="mt-4 flex flex-col gap-y-3 mask-b-from-50%">
                {[
                  { label: "API Calls", width: 85 },
                  { label: "Success Rate", width: 92 },
                  { label: "Workflows", width: 65 },
                ].map((item, index) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{item.label}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.width}%` }}
                        transition={{
                          duration: 1.2,
                          delay: 0.4 + index * 0.1,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-neutral-300 dark:bg-neutral-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
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
