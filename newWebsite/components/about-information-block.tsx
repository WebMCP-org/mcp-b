"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  BoltIcon,
  CloudCheckIcon,
  ShieldSplitIcon,
  SparklesIcon,
} from "@/icons/card-icons";

export const AboutInformationBlock = () => {
  const useCases = [
    {
      title: "Standards First",
      description:
        "Implements WebMCP (W3C Web Model Context API) developed by the Web Machine Learning Community Group, with bridge to Anthropic's Model Context Protocol",
      icon: <CloudCheckIcon className="text-brand size-6" />,
    },
    {
      title: "Zero Configuration",
      description:
        "Tools inherit browser sessions automatically—no OAuth flows, no API keys, no credential management. Add AI capabilities with ~50 lines of code",
      icon: <BoltIcon className="text-brand size-6" />,
    },
    {
      title: "Production Grade",
      description:
        "Complete TypeScript SDK with 6+ npm packages, 62+ Chrome Extension API wrappers, and comprehensive schema validation via Zod",
      icon: <ShieldSplitIcon className="text-brand size-6" />,
    },
    {
      title: "Human in the Loop",
      description:
        "Browser remains the primary interface where users monitor every agent action in real-time with transparent audit trails and explicit consent",
      icon: <SparklesIcon className="text-brand size-6" />,
    },
  ];
  const [activeUseCase, setActiveUseCase] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {useCases.map((useCase, index) => (
        <div
          onMouseEnter={() => setActiveUseCase(index)}
          onMouseLeave={() => setActiveUseCase(null)}
          key={useCase.title}
          className="relative h-full"
        >
          <div className="relative z-10 h-full border border-neutral-200 bg-gray-50 p-4 transition duration-200 hover:border-brand hover:bg-neutral-50 md:p-5 dark:border-neutral-800 dark:bg-neutral-800 dark:hover:border-brand dark:hover:bg-neutral-800/50">
            <div className="flex items-center gap-2">{useCase.icon}</div>
            <h3 className="mt-4 mb-2 text-base font-medium">{useCase.title}</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              {useCase.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
