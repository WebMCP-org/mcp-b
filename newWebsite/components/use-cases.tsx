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
import { GlowingEffect } from "./ui/glowing-effect";

export const UseCases = () => {
  const useCases = [
    {
      title: "Customer portals",
      description:
        "Agents can check orders, issue refunds, and send updates from the exact flows your customers already use.",
      icon: <WalletIcon className="text-brand size-6" />,
    },
    {
      title: "Operations hubs",
      description:
        "Expose triage, approvals, and fulfillment steps so assistants can move work forward inside your internal tools.",
      icon: <DevopsIcon className="text-brand size-6" />,
    },
    {
      title: "Analytics & BI",
      description:
        "Let LLMs query dashboards, export CSVs, or annotate charts without building a separate API surface.",
      icon: <GraphIcon className="text-brand size-6" />,
    },
    {
      title: "Support workbenches",
      description:
        "Assistants create tickets, escalate cases, or summarize threads directly inside Zendesk-style consoles.",
      icon: <PhoneIcon className="text-brand size-6" />,
    },
    {
      title: "Data operations",
      description:
        "Automate queries, transformations, and exports across your internal data consoles with full provenance.",
      icon: <DatabaseIcon className="text-brand size-6" />,
    },
    {
      title: "Supply chain & field",
      description:
        "Track shipments, manage inventory, or kick off field workflows using the authenticated browser session.",
      icon: <TruckIcon className="text-brand size-6" />,
    },
  ];
  const [activeUseCase, setActiveUseCase] = useState<number | null>(null);
  return (
    <Container className="border-divide relative overflow-hidden border-x px-4 md:px-8">
      <div className="relative flex flex-col items-center py-20">
        <Badge text="Where MCP-B Fits" />
        <SectionHeading className="mt-4">
          Let assistants work inside your existing products
        </SectionHeading>

        <SubHeading as="p" className="mx-auto mt-6 max-w-lg">
          When your UI is the MCP server, assistants can drive the same flows your team already trusts—using production permissions, not brittle RPA.
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
              <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={false}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                <div className="relative z-10 flex h-full flex-col rounded-lg bg-white/60 backdrop-blur-sm p-4 transition duration-200 hover:bg-transparent md:p-5 dark:bg-zinc-950/40">
                  <div className="flex items-center gap-2">{useCase.icon}</div>
                  <h3 className="mt-4 mb-2 text-lg font-medium">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{useCase.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
