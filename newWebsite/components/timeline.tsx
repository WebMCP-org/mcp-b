"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  links?: { label: string; href: string }[];
}

const timelineItems: TimelineItem[] = [
  {
    date: "Early June 2024",
    title: "The Idea",
    description:
      "Conceived the vision for bringing the Model Context Protocol to browsers, enabling deterministic AI-web interaction through structured tool calling instead of fragile UI automation.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    date: "Mid June 2024",
    title: "POC Launch & Hacker News",
    description:
      "Released the proof of concept and posted on Hacker News. The community response was overwhelming—reaching the top post and validating the need for browser-native AI integration.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    links: [
      {
        label: "View on Hacker News →",
        href: "https://news.ycombinator.com/item?id=44515403",
      },
      {
        label: "Original MCP-B Repo (900+ stars) →",
        href: "https://github.com/MiguelsPizza/WebMCP",
      },
      {
        label: "Viral LinkedIn Post →",
        href: "https://www.linkedin.com/posts/ivandj_mcp-b-is-turning-any-website-into-an-ai-controllable-activity-7349075617830637570-NA0x/",
      },
    ],
  },
  {
    date: "Late August 2024",
    title: "Full-Time Commitment",
    description:
      "Left my job to pursue MCP-B full-time. The potential to reshape how AI agents interact with the web was too significant to ignore.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    date: "September 2024",
    title: "WebMCP W3C Standard",
    description:
      "WebMCP was introduced as a web standard by the W3C Web Machine Learning Community Group. MCP-B became the reference implementation, providing navigator.modelContext polyfill and MCP bridge.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    links: [
      {
        label: "W3C WebML Community Group →",
        href: "https://www.w3.org/community/webmachinelearning/",
      },
      {
        label: "WebMCP Explainer →",
        href: "https://github.com/webmachinelearning/webmcp",
      },
    ],
  },
  {
    date: "November 2024",
    title: "Seeking Funding",
    description:
      "After months of rapid development and growing adoption, now seeking funding to scale the team and expand the ecosystem. The work has outgrown what one person can handle.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    links: [
      {
        label: "Connect on LinkedIn →",
        href: "https://www.linkedin.com/in/alex-nahas",
      },
      {
        label: "WebMCP Organization →",
        href: "https://github.com/WebMCP-org",
      },
      {
        label: "Get in Touch →",
        href: "/contact",
      },
    ],
  },
];

export const Timeline = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute left-0 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-transparent via-brand to-transparent md:left-1/2 md:-translate-x-1/2"
      />

      {/* Timeline items */}
      <div className="space-y-12 md:space-y-16">
        {timelineItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
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
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                className="border-divide group border bg-white p-6 transition-all hover:border-brand hover:shadow-lg dark:bg-neutral-900"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border border-brand/20 bg-brand/10 text-brand">
                    {item.icon}
                  </div>
                  <time className="text-sm font-mono tracking-tight text-brand uppercase">
                    {item.date}
                  </time>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
                {item.links && item.links.length > 0 && (
                  <div className="mt-4 flex flex-col gap-2">
                    {item.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm font-medium text-brand transition-colors hover:text-brand/80 hover:underline"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 translate-y-2 md:left-1/2"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-full border-2 border-brand bg-white dark:bg-neutral-900"
              />
              <div className="absolute inset-0 -z-10 animate-pulse bg-brand/20 blur-sm" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
