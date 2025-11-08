import React from "react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    date: "Early June 2024",
    title: "The Idea",
    description:
      "Conceived the vision for bringing the Model Context Protocol to browsers, enabling deterministic AI-web interaction through structured tool calling instead of fragile UI automation.",
  },
  {
    date: "Mid June 2024",
    title: "POC Launch & Hacker News",
    description:
      "Released the proof of concept and posted on Hacker News. The community response was overwhelming—reaching the top post and validating the need for browser-native AI integration.",
  },
  {
    date: "Late August 2024",
    title: "Full-Time Commitment",
    description:
      "Left my job to pursue MCP-B full-time. The potential to reshape how AI agents interact with the web was too significant to ignore.",
  },
  {
    date: "September 2024",
    title: "WebMCP W3C Standard",
    description:
      "WebMCP was introduced as a web standard by the W3C Web Machine Learning Community Group. MCP-B became the reference implementation, providing navigator.modelContext polyfill and MCP bridge.",
  },
  {
    date: "November 2024",
    title: "Seeking Funding",
    description:
      "After months of rapid development and growing adoption, now seeking funding to scale the team and expand the ecosystem. The work has outgrown what one person can handle.",
  },
];

export const Timeline = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand to-transparent md:left-1/2 md:-translate-x-1/2" />

      {/* Timeline items */}
      <div className="space-y-12 md:space-y-16">
        {timelineItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col md:flex-row md:items-center",
              index % 2 === 0 ? "md:flex-row-reverse" : "",
            )}
          >
            {/* Content */}
            <div
              className={cn(
                "pl-8 md:w-1/2 md:pl-0",
                index % 2 === 0 ? "md:pl-12" : "md:pr-12",
              )}
            >
              <div className="border-divide group border bg-white p-6 transition-all hover:border-brand hover:shadow-lg dark:bg-neutral-900">
                <time className="text-sm font-mono tracking-tight text-brand uppercase">
                  {item.date}
                </time>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Timeline dot */}
            <div className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 translate-y-2 md:left-1/2">
              <div className="h-full w-full border-2 border-brand bg-white dark:bg-neutral-900" />
              <div className="absolute inset-0 -z-10 animate-pulse bg-brand/20 blur-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
