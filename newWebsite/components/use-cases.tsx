"use client";
import React, { useState } from "react";
import { Container } from "./container";
import { Badge } from "./badge";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";
import {
  DevopsIcon,
  PhoneIcon,
  TruckIcon,
  DatabaseIcon,
  WalletIcon,
  GraphIcon,
} from "@/icons/card-icons";
import { Scale } from "./scale";
import { motion } from "motion/react";

export const UseCases = () => {
  const useCases = [
    {
      title: "E-Commerce",
      description:
        "Let AI agents browse products, check inventory, and place orders directly from your online store.",
      icon: <WalletIcon className="text-brand size-6" />,
    },
    {
      title: "Project Management",
      description:
        "Enable AI to create tasks, update status, and generate reports from your project management tools.",
      icon: <DevopsIcon className="text-brand size-6" />,
    },
    {
      title: "Analytics",
      description:
        "Allow AI to query metrics, generate visualizations, and export data from your analytics dashboards.",
      icon: <GraphIcon className="text-brand size-6" />,
    },
    {
      title: "Customer Support",
      description:
        "AI agents can access customer data, create tickets, and update support systems in real-time.",
      icon: <PhoneIcon className="text-brand size-6" />,
    },
    {
      title: "Data Operations",
      description:
        "Automate data queries, transformations, and exports across your database and analytics platforms.",
      icon: <DatabaseIcon className="text-brand size-6" />,
    },
    {
      title: "Supply Chain",
      description:
        "Track shipments, update inventory, and manage logistics through AI-powered automation.",
      icon: <TruckIcon className="text-brand size-6" />,
    },
  ];
  const [activeUseCase, setActiveUseCase] = useState<number | null>(null);
  return (
    <Container className="border-divide relative overflow-hidden border-x px-4 md:px-8">
      <div className="relative flex flex-col items-center py-20">
        <Badge text="What Gets Built" />
        <SectionHeading className="mt-4">
          Enabling the Next Generation
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg">
          When you build the right primitives, entire ecosystems emerge. Here are just some of the experiences our infrastructure enables.
        </SubHeading>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              onMouseEnter={() => setActiveUseCase(index)}
              key={useCase.title}
              className="relative"
            >
              {activeUseCase === index && (
                <motion.div
                  layoutId="scale"
                  className="absolute inset-0 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                >
                  <Scale />
                </motion.div>
              )}
              <div className="relative z-10 rounded-lg border border-gray-200 bg-gray-50 p-4 transition duration-200 hover:bg-transparent md:p-5 dark:border-white/10 dark:bg-zinc-950/40">
                <div className="flex items-center gap-2">{useCase.icon}</div>
                <h3 className="mt-4 mb-2 text-lg font-medium">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
