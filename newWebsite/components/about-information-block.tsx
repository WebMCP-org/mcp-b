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
      title: "Open Standards",
      description:
        "Built on W3C Web Model Context API and Anthropic's Model Context Protocol specifications for maximum compatibility",
      icon: <CloudCheckIcon className="text-brand size-6" />,
    },
    {
      title: "Developer First",
      description:
        "Simple JavaScript API with TypeScript support, React hooks, and comprehensive documentation for rapid integration",
      icon: <BoltIcon className="text-brand size-6" />,
    },
    {
      title: "Production Ready",
      description:
        "Battle-tested with 6+ npm packages, 62+ extension APIs, and real-world implementations across web applications",
      icon: <ShieldSplitIcon className="text-brand size-6" />,
    },
    {
      title: "Community Driven",
      description:
        "Open-source project with active development, comprehensive examples, and growing ecosystem of integrations",
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
