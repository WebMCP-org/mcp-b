"use client";
import React from "react";
import { Timeline as AcernityTimeline } from "@/components/ui/timeline";
import { Highlight } from "@/components/ui/hero-highlight";

const timelineData = [
  {
    title: "Early June 2025",
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
          The Idea
        </h3>
        <p className="text-xs font-normal leading-relaxed text-neutral-800 md:text-sm dark:text-neutral-300">
          Conceived the vision for bringing the{" "}
          <Highlight className="text-black dark:text-white">
            Model Context Protocol to browsers
          </Highlight>
          , enabling deterministic AI-web interaction through structured tool calling
          instead of fragile UI automation.
        </p>
      </div>
    ),
  },
  {
    title: "Mid June 2025",
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
          POC Launch & Hacker News
        </h3>
        <p className="mb-4 text-xs font-normal leading-relaxed text-neutral-800 md:text-sm dark:text-neutral-300">
          Released the proof of concept and posted on Hacker News. The community
          response was overwhelming—reaching the{" "}
          <Highlight className="text-black dark:text-white">
            top post
          </Highlight>{" "}
          and validating the need for browser-native AI integration.
        </p>
        <div className="flex flex-col gap-2">
          <a
            href="https://news.ycombinator.com/item?id=44515403"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand transition-colors hover:text-brand-light md:text-sm dark:text-brand-light dark:hover:text-brand"
          >
            → View on Hacker News
          </a>
          <a
            href="https://github.com/MiguelsPizza/WebMCP"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand transition-colors hover:text-brand-light md:text-sm dark:text-brand-light dark:hover:text-brand"
          >
            → Original MCP-B Repo (900+ stars)
          </a>
          <a
            href="https://www.linkedin.com/posts/ivandj_mcp-b-is-turning-any-website-into-an-ai-controllable-activity-7349075617830637570-NA0x/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand transition-colors hover:text-brand-light md:text-sm dark:text-brand-light dark:hover:text-brand"
          >
            → Viral LinkedIn Post
          </a>
        </div>
      </div>
    ),
  },
  {
    title: "Late August 2025",
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
          Full-Time Commitment
        </h3>
        <p className="text-xs font-normal leading-relaxed text-neutral-800 md:text-sm dark:text-neutral-300">
          Left my job to pursue MCP-B{" "}
          <Highlight className="text-black dark:text-white">
            full-time
          </Highlight>
          . The potential to{" "}
          <Highlight className="text-black dark:text-white">
            reshape how AI agents interact with the web
          </Highlight>{" "}
          was too significant to ignore.
        </p>
      </div>
    ),
  },
  {
    title: "September 2025",
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
          WebMCP W3C Standard
        </h3>
        <p className="mb-4 text-xs font-normal leading-relaxed text-neutral-800 md:text-sm dark:text-neutral-300">
          WebMCP was introduced as a{" "}
          <Highlight className="text-black dark:text-white">
            web standard by the W3C
          </Highlight>{" "}
          Web Machine Learning Community Group. MCP-B became the{" "}
          <Highlight className="text-black dark:text-white">
            reference implementation
          </Highlight>
          , providing navigator.modelContext polyfill and MCP bridge.
        </p>
        <div className="flex flex-col gap-2">
          <a
            href="https://www.w3.org/community/webmachinelearning/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand transition-colors hover:text-brand-light md:text-sm dark:text-brand-light dark:hover:text-brand"
          >
            → W3C WebML Community Group
          </a>
          <a
            href="https://github.com/webmachinelearning/webmcp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand transition-colors hover:text-brand-light md:text-sm dark:text-brand-light dark:hover:text-brand"
          >
            → WebMCP Explainer
          </a>
        </div>
      </div>
    ),
  },
  {
    title: "November 2025",
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold text-neutral-800 md:text-2xl dark:text-neutral-200">
          Seeking Funding
        </h3>
        <p className="mb-4 text-xs font-normal leading-relaxed text-neutral-800 md:text-sm dark:text-neutral-300">
          After months of rapid development and growing adoption, now{" "}
          <Highlight className="text-black dark:text-white">
            seeking funding
          </Highlight>{" "}
          to scale the team and expand the ecosystem. The work has outgrown what{" "}
          <Highlight className="text-black dark:text-white">
            one person can handle
          </Highlight>
          .
        </p>
        <div className="flex flex-col gap-2">
          <a
            href="https://www.linkedin.com/in/alex-nahas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand transition-colors hover:text-brand-light md:text-sm dark:text-brand-light dark:hover:text-brand"
          >
            → Connect on LinkedIn
          </a>
          <a
            href="https://github.com/WebMCP-org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand transition-colors hover:text-brand-light md:text-sm dark:text-brand-light dark:hover:text-brand"
          >
            → WebMCP Organization
          </a>
          <a
            href="/contact"
            className="text-xs text-brand transition-colors hover:text-brand-light md:text-sm dark:text-brand-light dark:hover:text-brand"
          >
            → Get in Touch
          </a>
        </div>
      </div>
    ),
  },
];

export const Timeline = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <AcernityTimeline data={timelineData} />
    </div>
  );
};
