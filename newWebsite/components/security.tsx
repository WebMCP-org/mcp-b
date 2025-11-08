import React from "react";
import { Container } from "./container";
import { SectionHeading } from "./seciton-heading";
import { SubHeading } from "./subheading";

export const Security = () => {
  return (
    <Container className="border-divide border-x px-8 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading>Built on Browser Security</SectionHeading>
        <SubHeading as="p" className="mx-auto mt-6">
          MCP-B leverages the browser's existing security model including same-origin policy, user consent, and sandboxed execution. All tool calls use your existing browser sessions—no API keys or OAuth flows needed.
        </SubHeading>
        <div className="mt-8 grid grid-cols-1 gap-4 text-left md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
            <p className="font-medium">Same-Origin Policy</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Built-in browser isolation</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
            <p className="font-medium">User Consent</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Explicit approval required</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
            <p className="font-medium">Transparent Audit</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">All operations logged</p>
          </div>
        </div>
      </div>
    </Container>
  );
};
